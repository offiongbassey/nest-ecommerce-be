export function urlGenerator(name: string) {
    return name.replace(/\s+/g, '-').replace(/:/g, "-").replace("/", "-").replace(",", "").toLowerCase();
}