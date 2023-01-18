var çıktıElementi = document.getElementsByClassName('mesajlar')[0]
var mesajListesi = []
var resimListesi = []
var deşifrelenenMesajlarNo = []
var deşifrelenenMesajlar = []
var mesajSayısı = 0

function çıktıyıGösterme(){
    var çıktıİçeriği = ""
    for (var i=0; i<mesajSayısı; i++){
        if(deşifrelenenMesajlarNo.includes(i)){
            çıktıİçeriği+=`
            <div class="mesaj">
                <div class="mesaj-no"> ${i+1}. Mesaj: </div>
                <br>
                <div class='deşifrelenmiş resim-çıktı'> </div>
                <input type="data" class="deşifre-kodu" required />
                <button class="deşifre-buton"> Deşifrele </button>
                <br>
                <br>
            </div>
            `
    
        } else{
            çıktıİçeriği+=`
            <div class="mesaj">
                <div class="mesaj-no"> ${i+1}. Mesaj: </div>
                <br>
                <div class='resim-çıktı'> </div>
                <input type="data" class="deşifre-kodu" required />
                <button class="deşifre-buton"> Deşifrele </button>
                <br>
                <br>
            </div>
            `
        }
    }

    var çıktıElementi = document.getElementsByClassName('mesajlar')[0]
    var resimVeyaMetin = document.getElementsByClassName('resim-çıktı')
    çıktıElementi.innerHTML = çıktıİçeriği
    
    for (var i=0; i<resimListesi.length; i++){
        if(deşifrelenenMesajlarNo.includes(i)){
            var index = deşifrelenenMesajlarNo.indexOf(i)
            var metin = deşifrelenenMesajlar[index]
            resimVeyaMetin[i].innerHTML = metin
            resimVeyaMetin[i].style.height = 'fit-content'
        } else{
            var resim = resimListesi[i]
            resimVeyaMetin[i].innerHTML = resim
        }
        
    }
    butonElementleri = document.getElementsByClassName('deşifre-buton')
    for (var i=0; i<butonElementleri.length; i++){
        var buton = butonElementleri[i]
        buton.addEventListener('click', Deşifrele)
    }
}

function mesajıGönder(){

    //Metni Şifreleme
    const metin = document.getElementById("metin").value;
    var şifreKodu = document.getElementById("ortak-anahtar").value;
    var anahtar = ""
    var şifrelenmişMetin = ""
    var metinArray = []
    var anahtarArray = []

    if(metin.length > 66){
        for(var i=0; i<metin.length; i++){
            if(i<66){
                metinArray.push(metin.charCodeAt(i))
            } else{
                metinArray[i%66] += metin.charCodeAt(i)
            }
        }
    } 
    else{
        for (var i=0; i<Math.floor(66/metin.length); i++){
            for (var j=0; j<metin.length; j++){
                metinArray.push(metin.charCodeAt(j))
            }
        }
        for(var i=0; i<66%metin.length; i++){
            metinArray.push(metin.charCodeAt(i))
        }
    }

    if(anahtar.length > 66){
        for(var i=0; i<şifreKodu.length; i++){
            if(i<66){
                anahtarArray.push(şifreKodu.charCodeAt(i))
            } else{
                anahtarArray[i%66] += şifreKodu.charCodeAt(i)
            }
        }
    } 
    else{
        for (var i=0; i<Math.floor(66/şifreKodu.length); i++){
            for (var j=0; j<şifreKodu.length; j++){
                anahtarArray.push(şifreKodu.charCodeAt(j))
            }
        }
        for(var i=0; i<66%metin.length; i++){
            anahtarArray.push(şifreKodu.charCodeAt(i))
        }
    }

    for(var i=0; i<Math.floor(metin.length/şifreKodu.length); i++){
        anahtar+=şifreKodu
    }
    for(var i=0; i<metin.length - Math.floor(metin.length/şifreKodu.length) * şifreKodu.length; i++){
        anahtar+=şifreKodu[i]
    }
    for (var i=0; i<metin.length; i++){
        var metinAscii = metin.charCodeAt(i)
        var anahtarAscii = anahtar.charCodeAt(i)
        var şifreliKod = metinAscii + anahtarAscii
        var metneEklenecekKarakter = String.fromCharCode(şifreliKod);
        şifrelenmişMetin += metneEklenecekKarakter
    }

    // Zaman
    const zaman = new Date()
    const milisaniye = zaman.getMilliseconds()
    const saniye = zaman.getSeconds()
    const dakika = zaman.getMinutes()
    const saat = zaman.getHours()
    const gün = zaman.getDay()
    const ay = zaman.getMonth()


    //Şifreli Metni Resme Dönüştürme
    var resmeDönüştürülmüşMetinAscii = []
    for(var i=0; i<66; i++){
        var total = metinArray[i] + anahtarArray[i]
        total = total % 155
        resmeDönüştürülmüşMetinAscii.push(total)
    }
    

    //Resim
    var resim = ` <div class='resim'> `

    //0
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[0] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[1] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[2] + Math.round(ay*9.09)});'> </div>
    `
    //1
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[1] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[2] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[3] + Math.round(ay*9.09)});'> </div>
    `
    //2
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[2] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[3] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[4] + Math.round(milisaniye/9.99)});'> </div>
    `
    //3
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[3] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[4] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[5] + Math.round(milisaniye/9.99)});'> </div>
    `
    //4
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[4] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[5] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[6] + Math.round(ay*9.09)});'> </div>
    `
    //5
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[5] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[6] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[7] + Math.round(ay*9.09)});'> </div>
    `
    //6
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[6] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[7] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[8] + Math.round(milisaniye/9.99)});'> </div>
    `
    //7
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[7] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[8] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[9] + Math.round(milisaniye/9.99)});'> </div>
    `
    //8
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[8] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[9] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[10] + Math.round(ay*9.09)});'> </div>
    `
    //9
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[9] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[10] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[11] + Math.round(ay*9.09)});'> </div>
    `
    //10
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[10] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[11] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[12] + Math.round(milisaniye/9.99)});'> </div>
    `
    //11
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[11] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[12] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[13] + Math.round(milisaniye/9.99)});'> </div>
    `
    //12
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[12] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[13] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[14] + Math.round(ay*9.09)});'> </div>
    `
    //13
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[13] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[14] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[15] + Math.round(ay*9.09)});'> </div>
    `
    //14
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[14] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[15] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[16] + Math.round(milisaniye/9.99)});'> </div>
    `
    //15
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[15] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[16] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[17] + Math.round(milisaniye/9.99)});'> </div>
    `

    //16
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[16] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[17] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[18] + Math.round(ay*9.09)});'> </div>
    `
    //17
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[17] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[18] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[19] + Math.round(ay*9.09)});'> </div>
    `
    //18
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[18] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[19] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[20] + Math.round(milisaniye/9.99)});'> </div>
    `
    //19
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[19] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[20] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[21] + Math.round(milisaniye/9.99)});'> </div>
    `
    //20
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[20] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[21] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[22] + Math.round(ay*9.09)});'> </div>
    `
    //21
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[21] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[22] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[23] + Math.round(ay*9.09)});'> </div>
    `
    //22
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[22] + Math.round(saat*4.349)}, ${resmeDönüştürülmüşMetinAscii[23] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[24] + Math.round(milisaniye/9.99)});'> </div>
    `
    //23
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[23] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[24] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[25] + Math.round(milisaniye/9.99)});'> </div>
    `
    //24
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[24] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[25] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[26] + Math.round(ay*9.09)});'> </div>
    `
    //25
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[25] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[26] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[27] + Math.round(ay*9.09)});'> </div>
    `
    //26
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[26] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[27] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[28] + Math.round(milisaniye/9.99)});'> </div>
    `
    //27
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[27] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[28] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[29] + Math.round(milisaniye/9.99)});'> </div>
    `
    //28
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[28] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[29] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[30] + Math.round(ay*9.09)});'> </div>
    `
    //29
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[29] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[30] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[31] + Math.round(ay*9.09)});'> </div>
    `
    //30
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[30] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[31] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[32] + Math.round(milisaniye/9.99)});'> </div>
    `
    //31
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[31] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[32] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[33] + Math.round(milisaniye/9.99)});'> </div>
    `

    //32
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[32] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[33] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[34] + Math.round(ay*9.09)});'> </div>
    `
    //33
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[33] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[34] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[35] + Math.round(ay*9.09)});'> </div>
    `
    //34
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[34] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[35] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[36] + Math.round(milisaniye/9.99)});'> </div>
    `
    //35
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[35] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[36] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[37] + Math.round(milisaniye/9.99)});'> </div>
    `
    //36
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[36] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[37] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[38] + Math.round(ay*9.09)});'> </div>
    `
    //37
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[37] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[38] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[39] + Math.round(ay*9.09)});'> </div>
    `
    //38
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[38] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[39] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[40] + Math.round(milisaniye/9.99)});'> </div>
    `
    //39
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[39] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[40] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[41] + Math.round(milisaniye/9.99)});'> </div>
    `
    //40
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[40] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[41] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[42] + Math.round(ay*9.09)});'> </div>
    `
    //41
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[41] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[42] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[43] + Math.round(ay*9.09)});'> </div>
    `
    //42
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[42] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[43] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[44] + Math.round(milisaniye/9.99)});'> </div>
    `
    //43
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[43] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[44] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[45] + Math.round(milisaniye/9.99)});'> </div>
    `
    //44
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[44] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[45] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[46] + Math.round(ay*9.09)});'> </div>
    `
    //45
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[45] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[46] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[47] + Math.round(ay*9.09)});'> </div>
    `
    //46
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[46] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[47] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[48] + Math.round(milisaniye/9.99)});'> </div>
    `
    //47
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[47] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[48] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[49] + Math.round(milisaniye/9.99)});'> </div>
    `

    //48
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[48] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[49] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[50] + Math.round(ay*9.09)});'> </div>
    `
    //49
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[49] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[50] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[51] + Math.round(ay*9.09)});'> </div>
    `
    //50
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[50] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[51] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[52] + Math.round(milisaniye/9.99)});'> </div>
    `
    //51
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[51] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[52] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[53] + Math.round(milisaniye/9.99)});'> </div>
    `
    //52
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[52] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[53] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[54] + Math.round(ay*9.09)});'> </div>
    `
    //53
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[53] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[54] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[55] + Math.round(ay*9.09)});'> </div>
    `
    //54
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[54] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[55] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[56] + Math.round(milisaniye/9.99)});'> </div>
    `
    //55
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[55] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[56] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[57] + Math.round(milisaniye/9.99)});'> </div>
    `
    //56
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[56] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[57] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[58] + Math.round(ay*9.09)});'> </div>
    `
    //57
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[57] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[58] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[59] + Math.round(ay*9.09)});'> </div>
    `
    //58
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[58] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[59] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[60] + Math.round(milisaniye/9.99)});'> </div>
    `
    //59
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[59] + Math.round(saniye*1.69)}, ${resmeDönüştürülmüşMetinAscii[60] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[61] + Math.round(milisaniye/9.99)});'> </div>
    `
    //60
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[60] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[61] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[62] + Math.round(ay*9.09)});'> </div>
    `
    //61
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[61] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[62] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[63] + Math.round(ay*9.09)});'> </div>
    `
    //62
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[62] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[63] + Math.round(gün*16.6)}, ${resmeDönüştürülmüşMetinAscii[64] + Math.round(milisaniye/9.99)});'> </div>
    `
    //63
    resim+= `
    <div class='pixel' style='background: rgb(${resmeDönüştürülmüşMetinAscii[63] + Math.round(saat*4.34)}, ${resmeDönüştürülmüşMetinAscii[64] + Math.round(dakika*1.69)}, ${resmeDönüştürülmüşMetinAscii[65] + Math.round(milisaniye/9.99)});'> </div>
    `

    resim+=` </div> `

    mesajListesi.push(şifrelenmişMetin)
    resimListesi.push(resim)
    mesajSayısı++
    çıktıyıGösterme()
}

function Deşifrele(e){
    var deşifreButonu = e.target
    var mesajElementi = deşifreButonu.parentElement
    var mesajNumarası = mesajElementi.getElementsByClassName('mesaj-no')[0].innerText
    mesajNumarası = parseInt(mesajNumarası.replace('. Mesaj:', '')) - 1
    var deşifrelenecekMetin = mesajListesi[mesajNumarası]
    var ortakAnahtar = mesajElementi.getElementsByClassName('deşifre-kodu')[0].value
    var uzatılmışAnahtar = ""
    for(var i=0; i<Math.floor(deşifrelenecekMetin.length/ortakAnahtar.length); i++){
        uzatılmışAnahtar+=ortakAnahtar
    }
    for(var i=0; i<deşifrelenecekMetin.length - Math.floor(deşifrelenecekMetin.length/ortakAnahtar.length) * ortakAnahtar.length; i++){
        uzatılmışAnahtar+=ortakAnahtar[i]
    }
    var deşifrelenmişMetin = ""
    for (var i=0; i<deşifrelenecekMetin.length; i++){
        var anahtarınKarakteri = uzatılmışAnahtar.charCodeAt(i)
        var metninKarakteri = deşifrelenecekMetin.charCodeAt(i)
        var deşifrelenmişKarakter = metninKarakteri - anahtarınKarakteri
        deşifrelenmişMetin += String.fromCharCode(deşifrelenmişKarakter);
    }
    var yeniMesaj = mesajElementi.getElementsByClassName('resim-çıktı')[0]
    yeniMesaj.style.backgroundColor = 'white'
    yeniMesaj.style.height = '32px'
    yeniMesaj.innerText = deşifrelenmişMetin
    yeniMesaj.classList.add('deşifrelenmiş')
    deşifrelenenMesajlarNo.push(mesajNumarası)
    deşifrelenenMesajlar.push(deşifrelenmişMetin)
}
