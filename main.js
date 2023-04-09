
 var people = [];
     var plots = [];
     var people_count = 0;
     var output = [];
     var draw_count = 0;

     function print_() {
          console.log(output[0]);
          console.log(output[1]);
          console.log(output[2]);
          console.log(output[3]);
          console.log(output[4]);
          
     }
     function random_sort(random_plots_0) {
          console.log(random_plots_0);
          const arr = random_plots_0;

          // shuffle the array using Durstenfeld algorithm and a random seed value
          const seed = Date.now();
          Math.seedrandom(seed.toString());
          for(let i = arr.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
          }

          // print the shuffled array and the seed value
          console.log(`Seed value: ${seed}`);

          //alert(draw_count);
          const shuffled_plots = arr.map(row => row.slice());
            
          output[draw_count] = shuffled_plots;


          table_output(output[draw_count]);
          console.log("Hello"+output[draw_count])
          draw_count = draw_count+1;

          console.log("Output 0"+output[0]);
          console.log("Output 1"+output[1]);

     }


     function table_output(random_plots) {
     if(random_plots == null)
     {
          alert("This LOTTERY is not done yet")
     }
     else
     {
          document.getElementById('tt').innerHTML="<i class='fas fa-copy'>&nbsp;Copy Table Content</i>"
          var tbodyEl = document.getElementById('tblcsvdata').getElementsByTagName('tbody')[0];
          tbodyEl.innerHTML = "";
          var row = 0;
               for (row = 0; row < people_count; row++) {
                     var newRow = tbodyEl.insertRow();
                     for (var col = 0; col < 5; col++) {
                          var newCell = newRow.insertCell();
                          if (row==0) {
                             newCell.innerHTML = '<b>'+people[row][col]+'</b>';
                          }
                          else
                          {
                              newCell.innerHTML = people[row][col];
                          }
                          
                     }
                     if(row == 0) {
                         newCell.innerHTML = '<b>'+"Plot-ID"+'</b>';
                         var newCell = newRow.insertCell();
                         newCell.innerHTML = '<b>'+people[row][4]+'</b>';
                     }
                     else {
                         newCell.innerHTML = random_plots[row-1];
                         var newCell = newRow.insertCell();
                         newCell.innerHTML = people[row][4];
                     }
               }
     }
      
     }

     function process_() {
          random_sort(plots.map(row => row.slice()));
          var x = 'btn['+ draw_count+ ']'
          document.getElementById(x).style.visibility = "visible";
          document.getElementById("load_").style.display = "none"
          if (draw_count == 5) {
            document.getElementById("draw_").style.visibility = "hidden";
          }
          document.getElementById("buttons").style.display = "block";
          document.getElementById("tt").style.display = "block";

     }


     function draw_plots() {
          if (plots.length == 0 || people.length ==0) {
             alert("Input the necessary files before processing");  
          }
          else
          {
               
               document.getElementById("load_").style.display = "block";
               document.getElementById("load_").innerHTML= "<center style='margin-top:5px'><p class='loader'></p></center>";
               setTimeout(process_, 5000);
          }
          
     }
     var files;
     function read_input_1() {
          files = document.querySelector('#file1').files;
          process_input();
          document.getElementById("input_1").innerHTML='<i style="font-size: 30px" class="fa fa-check"></i>'
     }

     function read_input_2() {
          files = document.querySelector('#file2').files;
          process_input();
          document.getElementById("input_2").innerHTML='<i style="font-size: 30px" class="fa fa-check"></i>'

     }

     function process_input(){
     var flag = 0;

     if(files.length > 0 ){

          // Selected file
          var file = files[0];

          // FileReader Object
          var reader = new FileReader();

          // Read file as string 
          reader.readAsText(file);

          // Load event
          reader.onload = function(event) {
               var csvdata = event.target.result;
               var rowData = csvdata.split('\n');

               // <table > <tbody>
               var tbodyEl = document.getElementById('tblcsvdata').getElementsByTagName('tbody')[0];
               tbodyEl.innerHTML = "";

               people_count = rowData.length;

               // Loop on the row Array (change row=0 if you also want to read 1st row)
               for (var row = 0; row < rowData.length; row++) {
                     var newRow = tbodyEl.insertRow();
                     rowColData = rowData[row].split(',');

                     if(rowColData.length == 7)
                     {
                         flag = 1;
                         plots[row]= rowColData[4];
                         //console.log(plots[row]);
                     }
                     else
                     {
                         people[row] = rowColData;
                         //console.log(people[row][0]);
                     }
                     

                     // Loop on the row column Array
                     for (var col = 0; col < rowColData.length; col++) {
                         var newCell = newRow.insertCell();
                         if (row==0) {
                             newCell.innerHTML = '<b>'+rowColData[col]+'</b>';
                         }
                         else
                         {
                              newCell.innerHTML = rowColData[col];
                         }

                     }
               }
               if (flag == 1) {
                    plots.shift();
               }
          };

     }else{
          alert("Please select a file.");
     }

}

function copyTableToClipboard(tableID) {
      var range, sel;
      if (document.createRange && window.getSelection) {
        range = document.createRange();
        sel = window.getSelection();
        sel.removeAllRanges();
        try {
          range.selectNodeContents(document.getElementById(tableID));
          sel.addRange(range);
        } catch (e) {
          range.selectNode(document.getElementById(tableID));
          sel.addRange(range);
        }
        document.execCommand('copy');
        sel.removeAllRanges();
        alert('Table copied to clipboard!');
      }
    }