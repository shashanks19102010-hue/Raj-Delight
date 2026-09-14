from pathlib import Path

PATH = Path('components/RajDelightPremium.tsx')
text = PATH.read_text(encoding='utf-8')
original = text

replacements = {
    "hero: 'https://images.unsplash.com/photo-1599354607448-8ad6e92b027a?auto=format&fit=crop&w=1800&q=88'": "hero: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1800&q=88'",
    "paneer: 'https://www.gravy.sg/assets/dish-paneer-tikka.jpg'": "paneer: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1400&q=88'",
    "momos: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto%2Cw_240%2Ch_240/a4d9cea5c4bf70725b3dd7931f0b5a70'": "momos: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=1400&q=88'",
    "burger: 'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto/be4e0e26fdd3f62ecf8e09f57e77d72e'": "burger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1400&q=88'",
    "<strong>9:30–12</strong>": "<strong>9:30 AM–12:00 AM</strong>",
}

for old, new in replacements.items():
    text = text.replace(old, new)

marker = "  const jump = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });"
insert = "  const toggleTheme = () => {\n    const next = theme === 'light' ? 'dark' : 'light';\n    document.documentElement.setAttribute('data-theme', next);\n    document.documentElement.style.colorScheme = next;\n    try { window.localStorage.setItem('raj-delight-theme', next); } catch {}\n    setTheme(next);\n  };\n\n" + marker
if marker in text and 'const toggleTheme' not in text:
    text = text.replace(marker, insert)

text = text.replace("onClick={() => setTheme((value) => value === 'light' ? 'dark' : 'light')}", "onClick={toggleTheme}")

if text != original:
    PATH.write_text(text, encoding='utf-8')
    print('patched')
else:
    print('already-fixed')
