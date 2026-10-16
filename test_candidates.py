import urllib.request

candidates = [
    # Bonsai / Olive
    "photo-1512496015851-a90fb38ba796",
    "photo-1599598425947-320d36746401",
    "photo-1603437873662-dc1f44901825",
    "photo-1613143323552-32b05cf14e7a",
    # Cactus / Desert monolith
    "photo-1509587584298-0f3b3a3a1797",
    "photo-1519336056116-bc0f1771dec8",
    "photo-1459411552884-841db9b3cc2a",
    "photo-1520302630591-fd1c66edc19d",
    # Bird of paradise / Strelitzia
    "photo-1589244159943-460088ed5c92",
    "photo-1628172911961-a53c155d8d0d",
    "photo-1600411833196-7c1f6b1a8b90",
    # Snake plant / Whale fin
    "photo-1598880940371-c756e015fea1",
    "photo-1501004318641-b39e6451bec6",
    # Ficus / Monstera
    "photo-1614594975525-e45190c55d0b",
    "photo-1545241047-6083a3684587",
    # Clay pottery
    "photo-1563245372-f21724e3856d",
    "photo-1516541196182-6bdb0516ed27",
    # Interior loft
    "photo-1600210492486-724fe5c67fb0",
    "photo-1600585154340-be6161a56a0c"
]

valid = []
for cid in candidates:
    url = f"https://images.unsplash.com/{cid}?auto=format&fit=crop&w=300&q=80"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as resp:
            if resp.status == 200:
                valid.append(cid)
                print(f"VALID: {cid}")
    except Exception as e:
        pass
print("TOTAL VALID:", len(valid))
