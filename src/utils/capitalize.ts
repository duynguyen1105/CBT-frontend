import ucfirst from "./ucfirst";

export default function capitalize(str: string): string {
  return str.split(' ').map(s => ucfirst(s)).join(' ');
}