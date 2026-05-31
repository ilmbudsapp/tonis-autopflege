from pathlib import Path
import re

p = Path(__file__).resolve().parents[1] / "index.html"
h = p.read_text(encoding="utf-8")

# Async Google Fonts removed — fonts are self-hosted via @fontsource in src/styles/fonts.css

# Move JSON-LD out of head
pat = r'    <script type="application/ld\+json">.*?</script>\n'
blocks = re.findall(pat, h, flags=re.DOTALL)
if blocks:
    h = re.sub(pat, "", h, count=len(blocks), flags=re.DOTALL)
    tag = "div"
    root = f'    <{tag} id="root"></{tag}>'
    h = h.replace(root, "".join(blocks) + root, 1)

# defer on app bundle
h = h.replace(
    '<script type="module" src="/src/main.tsx"></script>',
    '<script type="module" src="/src/main.tsx" defer></script>',
)

p.write_text(h, encoding="utf-8")
print("index.html fixed")
