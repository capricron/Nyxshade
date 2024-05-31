import { readFileSync } from 'fs';

// Baca file nuclei.txt
const data = readFileSync('nuclei.txt', 'utf8');

// Split data berdasarkan newline
const dataSplit = data.split('\n');

// Function untuk memproses setiap baris
const processLine = (line: any) => {
  // Split berdasarkan spasi dan tanda kurung siku []
  const parts = line.split(/[\[\]]+/).map((part: string) => part.trim()).filter((part: string) => part !== '');
  
  // Ambil bagian pertama sebagai deteksi
  if (parts.length > 0) {
    parts[0] = parts[0].replace(/-/g, ' ');
    return parts;
  }
  return null;
}

// Proses setiap baris
const results = dataSplit.map(processLine).filter(result => result !== null);

console.log(results[0]); // Contoh output: 'addeventlistener-detect'

// 
