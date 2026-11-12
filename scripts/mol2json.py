"""Convert a MOL2 structure to the compact JSON the site's 3D viewer reads.

Usage: python3 mol2json.py <structure.mol2> <out.json>
Keeps heavy atoms and the bonds between them; coordinates are centred on the
heavy-atom centroid. Rg is the unweighted heavy-atom radius of gyration.
"""
import json, math, sys

def convert(src, dst=None):
    atoms, bonds, sec = [], [], None
    for line in open(src, errors='replace'):
        if line.startswith('@<TRIPOS>'):
            sec = line.strip(); continue
        p = line.split()
        if sec == '@<TRIPOS>ATOM' and len(p) >= 6:
            atoms.append((int(p[0]), float(p[2]), float(p[3]), float(p[4]), p[5]))
        elif sec == '@<TRIPOS>BOND' and len(p) >= 4:
            bonds.append((int(p[1]), int(p[2])))
    def element(t):
        t = t.lower()
        if t.startswith('cl'): return 'Cl'
        if t.startswith('si'): return 'Si'
        return t[0].upper()
    el = {a[0]: element(a[4]) for a in atoms}
    heavy = [a for a in atoms if el[a[0]] != 'H']
    n = len(heavy)
    cx = sum(a[1] for a in heavy) / n; cy = sum(a[2] for a in heavy) / n; cz = sum(a[3] for a in heavy) / n
    rg = math.sqrt(sum((a[1]-cx)**2 + (a[2]-cy)**2 + (a[3]-cz)**2 for a in heavy) / n)
    order = {a[0]: k for k, a in enumerate(heavy)}
    elements = sorted({el[a[0]] for a in heavy})
    out = {
        'atoms': len(atoms), 'heavy': n, 'rg': round(rg, 2), 'elements': elements,
        'e': [elements.index(el[a[0]]) for a in heavy],
        'p': [round(v, 2) for a in heavy for v in (a[1]-cx, a[2]-cy, a[3]-cz)],
        'b': [order[k] for i, j in bonds if i in order and j in order for k in (i, j)],
    }
    if dst:
        json.dump(out, open(dst, 'w'), separators=(',', ':'))
    return out, rg

if __name__ == '__main__':
    out, rg = convert(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None)
    print(sys.argv[1].split('/')[-1], 'atoms', out['atoms'], 'heavy', out['heavy'], 'Rg %.3f' % rg, out['elements'])
