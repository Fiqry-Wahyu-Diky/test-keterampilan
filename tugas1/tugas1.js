// Method 1: Menampilkan deret Fibonacci
console.log("\n========= Tugas 1 Deret Fibonacci ==========")
function Fibonacci(jumlahDeret) {
    if (jumlahDeret <= 0) {
        console.log("Jumlah deret harus lebih besar dari 0.");
        return;
    }

    let a = 0, b = 1, c;
    let hasil = [];

    // Membuat deret Fibonacci
    for (let i = 0; i < jumlahDeret+1; i++) {
        if (i === 0) {
            hasil.push(a);
        } else if (i === 1) {
            hasil.push(b);
        } else {
            c = a + b;
            hasil.push(c);
            a = b;
            b = c;
        }
    }

    for (let i = 0; i < hasil.length; i++) {
        console.log(`F${i} = ${hasil[i]}`);
    }
    console.log("\nHasil deret fibonacci: ", hasil.join(", "));
}

let inpfibonaci = 10
Fibonacci(inpfibonaci)

// Method 2: Mengurutkan array
console.log("\n========= Tugas 2 Mengurutkan Array ==========")
function urutkanArray(arr) {
    let n = arr.length;
    console.log("Array inputan = ",arr);
    // Bubble Sort untuk mengurutkan array
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Membandingkan elemen yang berdekatan dan menukar jika diperlukan
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    console.log("Array setelah diurutkan:", arr);
}

let array = [5, 3, 8, 4, 2];
urutkanArray(array);

//Method 3: Mengecek kata atau kalimat palindrom
console.log("\n========= Tugas 3 Palindrom ==========")
function isPalindrom(kalimat) {
    // Menghapus spasi dan mengubah kalimat menjadi huruf kecil
    let cleanedKalimat = kalimat.replace(/[^A-Za-z0-9]/g, '').toLowerCase();

    // Membalik kalimat yang sudah dibersihkan
    let reversedKalimat = cleanedKalimat.split('').reverse().join('');

    // Membandingkan kalimat yang sudah dibersihkan dengan kalimat yang dibalik
    if (cleanedKalimat === reversedKalimat) {
        console.log(`'${kalimat}' adalah palindrom.`);
    } else {
        console.log(`'${kalimat}' bukan palindrom.`);
    }
}

// Contoh penggunaan
isPalindrom("Kasur rusak");
isPalindrom("Hello World");
