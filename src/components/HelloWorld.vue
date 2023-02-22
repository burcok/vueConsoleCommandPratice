<template>
  <div class="text-center"></div>
  <div class="duration-1000 bg-white dark:bg-gray-800 w-full h-screen px-24 py-12">
      <ul v-for='item in this.enterCount'>
          <li>
              <p style="font-family: Courier;" :class="'text'+item" class="mt-5 text-green-500 dark:text-green-400 text-xl">{{this.data}}<span class="animate-pulse dark:text-green-400 text-black">|</span></p>                
          </li>
          <li>
              <p style="font-family: Courier;" :class="'error'+item" class="hidden text-green-500 dark:text-green-400 text-xl"><span :class="'command'+item" class="command"></span> Invalid command! --help for commands.</p>
          </li>
          <li>
              <p style="font-family: Courier;" :class="'help'+item" class="hidden text-green-500 dark:text-green-400 text-xl">
                  Sık Kullanılan Komutlar:<br>
                  &nbsp;&nbsp;ls &nbsp;&nbsp;&nbsp;- Dizin ayrıntılarını listele<br>
                  &nbsp;&nbsp;cd &nbsp;&nbsp;&nbsp;- Bir alt dizine geç<br>
                  &nbsp;&nbsp;cd .. - Bir üst dizine geç<br>
                  &nbsp;&nbsp;cls &nbsp;&nbsp;- Terminali temizle<br>
              </p>
          </li>
      </ul>
  </div>
</template>


<script>
export default {
  data() {
      return {
          currentYear: (new Date().getFullYear())-2005,
          currentMonth: (new Date().getMonth())+1,
          count:20,
          enterCount:1,
          data: 'C:\\Users\\Vuengineer\\',
          currentDir: 'vuengineer',
          dirLength:20,
          tempKey: '',
          checkDir:0
      }
  },
  methods: {
      myEventListener(event) {
          if (event.code == 'Backspace' || event.code == 'Delete') {
              this.count -= 1;
              if( (this.currentDir=="vuengineer" && this.count<20) || (this.currentDir=="yas" && this.count<24) || (this.currentDir=="ozgecmis" && this.count<29) ){
                  this.checkDirection()
              }
              this.data = this.cutData(this.data, this.count)
          }
          else if ((event.code).includes('Key') || ((event.code).includes('Comma')) || ((event.code).includes('Period')) || ((event.code).includes('Semicolon')) || ((event.code).includes('Quote')) || ((event.code).includes('BracketLeft')) || ((event.code).includes('BracketRight'))) {
              this.count += 1;
              this.data += event.key;
          }
          else if((event.code) == "Space"){
              if (this.tempKey == event.code){
                  
              }
              else{
                  this.count += 1;
                  this.data += " ";
              }
          }
          else if((event.code) == "Equal"){
              this.count += 1;
              this.data += "-";
          }
          else if((event.code) == "Slash"){
              this.count += 1;
              this.data += ".";
          }
          else if(event.shiftKey && event.keyCode == 55)
          {
              this.count += 1;
              this.data += "/";
          }
          else if((event.code) == "Enter")
          {
              document.querySelector('.text'+this.enterCount).innerHTML = this.cutData(this.data, this.count)
              this.enterCount += 1
              console.log(this.count)
              this.analyseData(this.data,this.count)
              
              this.checkDirection()
              
              return
          }
          this.tempKey = event.code
          
          let finalText = '.text' + (this.enterCount)
          document.querySelector(finalText).innerHTML = this.cutData(this.data, this.count)+ '<span class="animate-pulse dark:text-green-400 text-black">|</span>'
          // console.log(document.querySelector('.text'+this.enterCount).innerHTML)
          window.scrollTo(0, document.body.scrollHeight);
      },
      analyseData(data,leng){
          let pieces = data.split("\\")
          let count = pieces[pieces.length - 1].length
          data = data.slice(leng-count)

          if(data =="--help"){
              let finalHelp = '.help' + (this.enterCount-1)
              document.querySelector(finalHelp).classList.remove('hidden');
          } 
          else if(data=="ls"){
              if(this.checkDir==0){
                  let finalError = '.error' + (this.enterCount-1)
                  document.querySelector(finalError).classList.remove('hidden');
                  document.querySelector(finalError).innerHTML = " yas <br> ozgecmis <br> github"
              }
              if(this.checkDir==1 && this.currentDir=="yas"){
                  let finalError = '.error' + (this.enterCount-1)
                  document.querySelector(finalError).classList.remove('hidden');
                  document.querySelector(finalError).innerHTML = this.currentYear -1
              }
              if(this.checkDir==1 && this.currentDir=="ozgecmis"){
                  let finalError = '.error' + (this.enterCount-1)
                  document.querySelector(finalError).classList.remove('hidden');
                  document.querySelector(finalError).innerHTML = 'Merhaba ben Burak. 17 yaşındayım ve 3 yıldan uzun süredir yazılım ile ilgileniyorum. Orta seviye Javascript(Vue.js), Typescript, Python, PHP, C# bilgim var. Kendi projelerimin yanı sıra 1 yıla yakın staj yaptığım bir firmanın gelişmiş projelerinde de, karmaşık projelerin yapısı öğrendim. Henüz junior olsam da seviyemin en iyi olabileceğimi düşünüyorum.'
              }
              if(this.checkDir==1 && this.currentDir=="github"){
                  let finalError = '.error' + (this.enterCount-1)
                  document.querySelector(finalError).classList.remove('hidden');
                  document.querySelector(finalError).innerHTML = this.currentYear
              }
          }
          else if(data=="cls"){
              this.data = this.cutData(this.data,leng-count)
              this.enterCount = 1
              let finalText = '.text' + (this.enterCount)
              document.querySelector(finalText).innerHTML = this.cutData(this.data, this.count)+ '<span class="animate-pulse text-black">|</span>'
              let finalError = '.error' + (this.enterCount)
              document.querySelector(finalError).classList.add('hidden');
              let finalHelp = '.help' + (this.enterCount)
              document.querySelector(finalHelp).classList.add('hidden');
              
          }
          else if(data=="cd .."){
              if((this.checkDir-1) < 0){
                  
                  let finalError = '.error' + (this.enterCount-1)
                  document.querySelector(finalError).classList.remove('hidden');
                  document.querySelector(finalError).innerHTML = "Access Denied!"
              }
              else{
                  this.currentDir = "vuengineer"
                  this.checkDir -= 1
              }
          }
          else if(data=="cd yas" && this.checkDir==0){
              this.checkDir = 1
              this.currentDir = "yas"
          }
          else if(data=="cd ozgecmis" && this.checkDir==0){
              this.checkDir = 1
              this.currentDir = "ozgecmis"
          }  
          else if(data=="cd github" && this.checkDir==0){
              this.checkDir = 1
              this.currentDir = "repositories"
          }   
          else {
              let finalError = '.error' + (this.enterCount-1)
              document.querySelector(finalError).classList.remove('hidden');
              let finalCommand = '.command' + (this.enterCount-1)
              let pieces = this.data.split("\\")
              let count = pieces[pieces.length - 1].length
              document.querySelector(finalCommand).innerHTML = this.data.slice((this.count-count),this.count)
          }
          // console.log(this.checkDir)
          return
          
      },
      cutData(data, count) {
          return data.slice(0, count);
      },
      checkDirection(){
          if (this.checkDir==0){
              this.data = "C:\\Users\\Vuengineer\\"
              this.count = 20 
          }
          else if(this.checkDir==1 && this.currentDir=="ozgecmis"){
              this.data = "C:\\Users\\Vuengineer\\ozgecmis\\"
              this.count = 29
          }
          else if(this.checkDir==1 && this.currentDir=="yas"){
              this.data = "C:\\Users\\Vuengineer\\yas\\"
              this.count = 24
          }
          else if(this.checkDir==1 && this.currentDir=="repositories"){
              this.data = "C:\\Users\\Vuengineer\\repositories\\"
              this.count = 33
          }
      }
  },
  mounted() {
      addEventListener("keydown", this.myEventListener);
      if (this.currentMonth <9){
        this.currentYear = this.currentYear -1;
      }
  },
  beforeUnmount() {
      removeEventListener("keydown", this.myEventListener);
  }
}
</script>
