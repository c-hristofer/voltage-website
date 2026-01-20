import * as fs from 'node:fs/promises';
import * as path from 'node:path';
const repoRoot = process.cwd();
const referenceRoot = path.join(repoRoot, 'reference', 'voltage-history');
const yearsSourceDir = path.join(referenceRoot, 'years');
const contentDir = path.join(repoRoot, 'content', 'about', 'history');
const yearsOutputDir = path.join(contentDir, 'years');
const publicHistoryDir = path.join(repoRoot, 'public', 'history');
const remoteBase = 'https://www.teamvoltage.org';
const teamDomains = ['https://www.teamvoltage.org', 'https://teamvoltage.org'];
const missingSources = new Set();
async function pathExists(target) {
    try {
        await fs.access(target);
        return true;
    }
    catch {
        return false;
    }
}
async function fetchText(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to download ${url}: ${response.status}`);
    }
    return response.text();
}
async function downloadToFile(url, destination) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to download ${url}: ${response.status}`);
    }
    await fs.mkdir(path.dirname(destination), { recursive: true });
    const buffer = Buffer.from(await response.arrayBuffer());
    await fs.writeFile(destination, buffer);
}
function slugifyYear(label, fallback) {
    return (label
        .toLowerCase()
        .replace(/[^\w]+/g, '-')
        .replace(/^-+|-+$/g, '') || `year-${fallback}`);
}
async function readReferenceHtml(relativePath) {
    const fullPath = path.join(referenceRoot, relativePath);
    if (!(await pathExists(fullPath))) {
        missingSources.add(path.relative(repoRoot, fullPath));
        return null;
    }
    return fs.readFile(fullPath, 'utf8');
}
async function ensureCheerio() {
    const hasReference = await pathExists(referenceRoot);
    if (!hasReference)
        return null;
    try {
        const mod = await import('cheerio');
        return mod;
    }
    catch {
        missingSources.add('node_modules/cheerio (install dependencies to enable parsing)');
        return null;
    }
}
function toRemoteUrl(src) {
    try {
        return new URL(src, remoteBase).href;
    }
    catch {
        return null;
    }
}
async function copyAssetToHistory(src, yearSlug, subfolder = '') {
    const cleanSrc = src.split('?')[0];
    const fileName = path.basename(cleanSrc);
    const destinationDir = path.join(publicHistoryDir, yearSlug, subfolder);
    const destinationPath = path.join(destinationDir, fileName);
    const relativeCandidates = cleanSrc.startsWith('/')
        ? [cleanSrc.slice(1), cleanSrc]
        : [cleanSrc];
    const candidatePaths = relativeCandidates.flatMap((relative) => [
        path.join(referenceRoot, relative),
        path.join(yearsSourceDir, relative),
        path.join(referenceRoot, 'assets', relative)
    ]);
    candidatePaths.push(path.join(publicHistoryDir, fileName));
    candidatePaths.push(path.join(repoRoot, 'public', 'images', 'history', fileName));
    for (const candidate of candidatePaths) {
        if (await pathExists(candidate)) {
            await fs.mkdir(destinationDir, { recursive: true });
            await fs.copyFile(candidate, destinationPath);
            const relativeFolder = subfolder ? `/${subfolder}` : '';
            return `/history/${yearSlug}${relativeFolder}/${fileName}`;
        }
    }
    try {
        const remoteUrl = toRemoteUrl(cleanSrc);
        if (!remoteUrl)
            throw new Error('Invalid URL');
        await downloadToFile(remoteUrl, destinationPath);
        const relativeFolder = subfolder ? `/${subfolder}` : '';
        return `/history/${yearSlug}${relativeFolder}/${fileName}`;
    }
    catch (error) {
        missingSources.add(`Image not found for year ${yearSlug}: ${src} (${error.message})`);
        return null;
    }
}
async function copyImageAsset(src, yearSlug) {
    return copyAssetToHistory(src, yearSlug);
}
async function copyDownloadAsset(src, yearSlug) {
    return copyAssetToHistory(src, yearSlug, 'downloads');
}
async function ensureReferenceFiles() {
    await fs.mkdir(yearsSourceDir, { recursive: true });
    const historyPath = path.join(referenceRoot, 'history.html');
    if (!(await pathExists(historyPath))) {
        try {
            const html = await fetchText(`${remoteBase}/history.html`);
            await fs.mkdir(path.dirname(historyPath), { recursive: true });
            await fs.writeFile(historyPath, html);
        }
        catch (error) {
            missingSources.add(`Failed to download history.html: ${error.message}`);
        }
    }
    const cheerio = await ensureCheerio();
    if (!cheerio)
        return;
    const localHistory = await readReferenceHtml('history.html');
    if (!localHistory)
        return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { load } = cheerio;
    const $ = load(localHistory);
    const yearLinks = new Set();
    $('#wsite-content a').each((_, el) => {
        const href = $(el).attr('href');
        if (!href)
            return;
        if (/\d{4}/.test(href) && href.endsWith('.html')) {
            yearLinks.add(href);
        }
    });
    // Fallback known slugs
    const fallbackSlugs = [
        '2025-reefscape',
        '2024-crescendo',
        '2023-charged-up',
        '2022-rapid-react',
        '2021-infinite-recharge-2',
        '2020-infinite-recharge',
        '2019-destination-deep-space',
        '2018-power-up',
        '2017-steamworks',
        '2016-stronghold',
        '2015-recycle-rush',
        '2014-aerial-assist',
        '2013-ultimate-ascent',
        '2012-rebound-rumble',
        '2011-logo-motion',
        '2010-breakaway',
        '2009-lunacy',
        '2008-first-overdrive',
        '2007-rack-rsquon-roll',
        '2006-aim-high',
        '2005-triple-play',
        '2004-first-frenzy',
        '2003-stack-attack',
        '2002-zone-zeal',
        '2001-diabolical-dynamics',
        '2000-co-opertition'
    ];
    fallbackSlugs.forEach((slug) => yearLinks.add(`/${slug}.html`));
    for (const href of yearLinks) {
        const url = new URL(href, remoteBase).href;
        const slugName = href.replace(/^\//, '');
        const localPath = path.join(yearsSourceDir, slugName);
        if (await pathExists(localPath))
            continue;
        try {
            const html = await fetchText(url);
            await fs.mkdir(path.dirname(localPath), { recursive: true });
            await fs.writeFile(localPath, html);
        }
        catch (error) {
            missingSources.add(`Failed to download ${url}: ${error.message}`);
        }
    }
}
async function convertHtmlToMdx(html, yearLabel, yearSlug) {
    const cheerio = await ensureCheerio();
    if (!cheerio) {
        return `> History content for ${yearLabel} is unavailable because required parsing tools are not installed.`;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cheerioModule = cheerio;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const $ = cheerioModule.load(html);
    const body = $('#wsite-content').length ? $('#wsite-content') : $('body');
    const chunks = [];
    const imageMap = new Map();
    const images = body.find('img').toArray();
    for (const img of images) {
        const original = $(img).attr('src');
        if (!original)
            continue;
        const mapped = await copyImageAsset(original, yearSlug);
        if (mapped) {
            imageMap.set(original, mapped);
        }
    }
    async function rewriteHref(href) {
        var _a;
        const normalized = href.replace('http://', 'https://');
        const absolute = normalized.startsWith('http')
            ? normalized
            : (_a = toRemoteUrl(normalized)) !== null && _a !== void 0 ? _a : normalized;
        const domainMatch = teamDomains.find((domain) => absolute.startsWith(domain));
        const pathPart = domainMatch ? absolute.slice(domainMatch.length) : normalized;
        const isTeam = Boolean(domainMatch);
        if (isTeam) {
            if (pathPart.startsWith('/history'))
                return '/about/history';
            const yearMatch = pathPart.match(/(\d{4})/);
            if (yearMatch && pathPart.endsWith('.html')) {
                return `#year-${yearMatch[1]}`;
            }
            if (pathPart.startsWith('/uploads') || pathPart.startsWith('/documents')) {
                const local = await copyDownloadAsset(pathPart, yearSlug);
                return local || '#';
            }
            return pathPart || '/';
        }
        if (pathPart.startsWith('/uploads') ||
            pathPart.startsWith('uploads') ||
            pathPart.startsWith('/documents')) {
            const local = await copyDownloadAsset(pathPart, yearSlug);
            if (local)
                return local;
            return '#';
        }
        return normalized;
    }
    for (const anchor of body.find('a').toArray()) {
        const href = $(anchor).attr('href');
        if (!href)
            continue;
        const rewritten = await rewriteHref(href);
        $(anchor).attr('href', rewritten || '#');
    }
    function sanitizeHref(href) {
        if (!href)
            return '#';
        const cleaned = href.replace('http://', 'https://');
        const domainMatch = teamDomains.find((domain) => cleaned.startsWith(domain));
        if (domainMatch) {
            const pathPart = cleaned.slice(domainMatch.length);
            const yearMatch = pathPart.match(/(\\d{4})/);
            if (yearMatch) {
                return `#year-${yearMatch[1]}`;
            }
            if (pathPart.includes('history')) {
                return '/about/history';
            }
            return pathPart.startsWith('/') ? pathPart : `/${pathPart}`;
        }
        return cleaned;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function serialize(node) {
        if (node.type === 'text') {
            return $(node)
                .text()
                .replace(/\\s+/g, ' ')
                .trim();
        }
        if (node.type !== 'tag')
            return '';
        const children = $(node)
            .contents()
            .toArray()
            .map((child) => serialize(child))
            .filter(Boolean)
            .join(' ');
        switch (node.name) {
            case 'h1':
            case 'h2':
            case 'h3':
                return `\\n\\n### ${children}\\n\\n`;
            case 'p':
                return `\\n\\n${children}\\n\\n`;
            case 'li':
                return `- ${children}\\n`;
            case 'ul':
            case 'ol':
                return $(node)
                    .children('li')
                    .toArray()
                    .map((li) => serialize(li))
                    .join('');
            case 'a': {
                const href = sanitizeHref($(node).attr('href'));
                const text = children || href;
                return `[${text}](${href})`;
            }
            case 'br':
                return '\\n';
            case 'img': {
                const src = $(node).attr('src');
                if (!src)
                    return '';
                const mapped = imageMap.get(src);
                if (!mapped) {
                    missingSources.add(`Missing image asset for ${yearLabel}: ${src}`);
                    return '';
                }
                return `![${$(node).attr('alt') || yearLabel}](${mapped})`;
            }
            case 'iframe': {
                const src = $(node).attr('src');
                if (!src)
                    return '';
                return `\\n\\n<iframe src="${src}" title="${yearLabel} video" loading="lazy" allowFullScreen className="w-full aspect-video rounded-2xl border border-white/10"></iframe>\\n\\n`;
            }
            default:
                return children;
        }
    }
    body.children().each((_, elem) => {
        const block = serialize(elem);
        if (block.trim()) {
            chunks.push(block);
        }
    });
    if (!chunks.length) {
        return `> History content for ${yearLabel} could not be parsed.`;
    }
    return chunks.join('\\n');
}
async function writeFileSafe(target, contents) {
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, contents);
}
async function importHistory() {
    await fs.rm(contentDir, { recursive: true, force: true });
    await fs.rm(publicHistoryDir, { recursive: true, force: true });
    await fs.mkdir(yearsOutputDir, { recursive: true });
    await fs.mkdir(publicHistoryDir, { recursive: true });
    await ensureReferenceFiles();
    const introHtml = await readReferenceHtml('history.html');
    let introBody = 'Team Voltage history content is not yet available in this workspace. Add local reference files and re-run the import.';
    const introTitle = 'Team Voltage History';
    const introDescription = 'Year-by-year program milestones from the founding of Team Voltage through the latest FIRST Robotics Competition games.';
    if (introHtml) {
        const cheerio = await ensureCheerio();
        if (cheerio) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { load } = cheerio;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const $ = load(introHtml);
            introBody = $('#wsite-content').text().trim() || introBody;
        }
    }
    await writeFileSafe(path.join(contentDir, 'index.mdx'), `---\\ntitle: ${JSON.stringify(introTitle)}\\ndescription: ${JSON.stringify(introDescription)}\\n---\\n\\n${introBody}\\n`);
    const yearsAvailable = (await pathExists(yearsSourceDir))
        ? (await fs.readdir(yearsSourceDir)).filter((file) => file.endsWith('.html'))
        : [];
    if (!(await pathExists(yearsSourceDir))) {
        missingSources.add(path.relative(repoRoot, yearsSourceDir));
    }
    const yearMetas = [];
    for (const file of yearsAvailable.sort()) {
        const filePath = path.join(yearsSourceDir, file);
        const html = await fs.readFile(filePath, 'utf8');
        const yearMatch = file.match(/(\\d{4})/);
        const yearValue = yearMatch ? parseInt(yearMatch[1], 10) : 0;
        const cheerio = await ensureCheerio();
        let title = file.replace('.html', '');
        if (cheerio) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const { load } = cheerio;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const $ = load(html);
            const heading = $('h1,h2,h3').first().text().trim();
            if (heading)
                title = heading;
        }
        const slug = slugifyYear(title || `year-${yearValue}`, yearValue);
        const mdxBody = await convertHtmlToMdx(html, title, slug);
        const mdx = `---\\ntitle: ${JSON.stringify(title)}\\n---\\n\\n${mdxBody}\\n`;
        await writeFileSafe(path.join(yearsOutputDir, `${slug}.mdx`), mdx);
        yearMetas.push({
            year: yearValue || title.length,
            title,
            slug,
            filePath: path.relative(repoRoot, filePath)
        });
    }
    const indexPayload = {
        years: yearMetas.sort((a, b) => b.year - a.year),
        missing: Array.from(missingSources)
    };
    await writeFileSafe(path.join(yearsOutputDir, 'index.json'), JSON.stringify(indexPayload, null, 2));
    console.log('History import complete.');
    if (indexPayload.missing.length) {
        console.log('Missing sources:');
        indexPayload.missing.forEach((item) => console.log(`- ${item}`));
    }
}
importHistory().catch((error) => {
    console.error('Failed to import voltage history:', error);
    process.exitCode = 1;
});
