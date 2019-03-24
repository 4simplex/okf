export function RemoveWhiteSpaces(name: string) {
    return name.split(/\s+/).join(' ').trim();
}
