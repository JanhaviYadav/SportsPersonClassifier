// Dropzone.autoDiscover = false;

// function init() {
//     let dz = new Dropzone("#dropzone", {
//         url: "/",
//         maxFiles: 1,
//         addRemoveLinks: true,
//         dictDefaultMessage: "Some Message",
//         autoProcessQueue: false
//     });
    
//     dz.on("addedfile", function() {
//         if (dz.files[1]!=null) {
//             dz.removeFile(dz.files[0]);        
//         }
//     });

//     dz.on("complete", function (file) {
//         let imageData = file.dataURL;
        
//         var url = "http://127.0.0.1:5000/classify_image";

//         $.post(url, {
//             image_data: imageData
//         },function(data, status){
//             console.log(data[0].class_probability);
//             if (!data || data.length==0) {
//                 $("#resultHolder").hide();
//                 $("#divClassTable").hide();                
//                 $("#error").show();
//             }
            
//             let match = null;
//             let bestScore = -1;
//             for (let i=0;i<data.length;++i) {
//                 let maxScoreForThisClass = Math.max(...data[i].class_probability);
//                 if(maxScoreForThisClass>bestScore) {
//                     match = data[i];
//                     bestScore = maxScoreForThisClass;
//                 }
//             }
//             if (match) {
//                 $("#error").hide();
//                 $("#resultHolder").show();
//                 $("#divClassTable").show();
//                 $("#resultHolder").html($(`[data-player="${match.class}"`).html());
//                 let classDictionary = match.class_dictionary;
//                 for(let personName in classDictionary) {
//                     let index = classDictionary[personName];
//                     let proabilityScore = match.class_probability[index];
//                     let elementName = "#score_" + personName;
//                     $(elementName).html(proabilityScore);
//                 }
            
//                 document.querySelector("#score_lionel_messi").textContent = data[0].class_probability[0]
//                 document.querySelector("#score_maria_sharapova").textContent = data[0].class_probability[1]
//                 document.querySelector("#score_roger_federer").textContent = data[0].class_probability[2]
//                 document.querySelector("#score_serena_williams").textContent = data[0].class_probability[3]
//                 document.querySelector("#score_virat_kohli").textContent = data[0].class_probability[4]

//                 if (data[0].class_probability[0] > 50)
//                 document.querySelector("#resultHolder").innerHTML = `<img src="images/messi.jpeg">`
//                 if (data[0].class_probability[1] > 50)
//                 document.querySelector("#resultHolder").innerHTML = `<img src="images/sharapova.jpeg">`
//                 if (data[0].class_probability[2] > 50)
//                 document.querySelector("#resultHolder").innerHTML = `<img src="images/federer.jpeg">`
//                 if (data[0].class_probability[3] > 50)
//                 document.querySelector("#resultHolder").innerHTML = `<img src="images/serena.jpeg">`
//                 if (data[0].class_probability[4] > 50)
//                 document.querySelector("#resultHolder").innerHTML = `<img src="images/virat.jpeg">`
//             }
//         });
//     });

//     $("#submitBtn").on('click', function (e) {
//         dz.processQueue();		
//     });
// }

// $(document).ready(function() {
//     console.log( "ready!" );
//     $("#error").hide();
//     $("#resultHolder").hide();
//     $("#divClassTable").hide();

//     init();
// });

Dropzone.autoDiscover = false;

function init() {
    let dz = new Dropzone("#dropzone", {
        url: "/",
        maxFiles: 1,
        addRemoveLinks: true,
        dictDefaultMessage: "Some Message",
        autoProcessQueue: false
    });
    
    dz.on("addedfile", function() {
        if (dz.files[1]!=null) {
            dz.removeFile(dz.files[0]);        
        }
    });

    dz.on("complete", function (file) {
        let imageData = file.dataURL;
        
        var url = "http://127.0.0.1:5000/classify_image";

        $.post(url, {
            image_data: imageData
        },function(data, status){    
            console.log(data);
            if (!data || data.length==0) {
                $("#resultHolder").hide();
                $("#divClassTable").hide();                
                $("#error").show();
            }
            
            let match = null;
            let bestScore = -1;
            for (let i=0;i<data.length;++i) {
                let maxScoreForThisClass = Math.max(...data[i].class_probability);
                if(maxScoreForThisClass>bestScore) {
                    match = data[i];
                    bestScore = maxScoreForThisClass;
                }
            }
            if (match) {
                $("#error").hide();
                $("#resultHolder").show();
                $("#divClassTable").show();
                $("#resultHolder").html($(`[data-player="${match.class}"`).html());
                let classDictionary = match.class_dictionary;
                for(let personName in classDictionary) {
                    let index = classDictionary[personName];
                    let proabilityScore = match.class_probability[index];
                    let elementName = "#score_" + personName;
                    $(elementName).html(proabilityScore);
                }
            }
                document.querySelector("#score_lionel_messi").textContent = data[0].class_probability[0]
                document.querySelector("#score_maria_sharapova").textContent = data[0].class_probability[1]
                document.querySelector("#score_roger_federer").textContent = data[0].class_probability[2]
                document.querySelector("#score_serena_williams").textContent = data[0].class_probability[3]
                document.querySelector("#score_virat_kohli").textContent = data[0].class_probability[4]

                if (data[0].class_probability[0] > 50)
                document.querySelector("#resultHolder").innerHTML = `<img src="images/messi.jpeg">`
                if (data[0].class_probability[1] > 50)
                document.querySelector("#resultHolder").innerHTML = `<img src="images/sharapova.jpeg">`
                if (data[0].class_probability[2] > 50)
                document.querySelector("#resultHolder").innerHTML = `<img src="images/federer.jpeg">`
                if (data[0].class_probability[3] > 50)
                document.querySelector("#resultHolder").innerHTML = `<img src="images/serena.jpeg">`
                if (data[0].class_probability[4] > 50)
                document.querySelector("#resultHolder").innerHTML = `<img src="images/virat.jpeg">`          
        });
    });

    $("#submitBtn").on('click', function (e) {
        dz.processQueue();		
    });
}

$(document).ready(function() {
    console.log( "ready!" );
    $("#error").hide();
    $("#resultHolder").hide();
    $("#divClassTable").hide();

    init();
});