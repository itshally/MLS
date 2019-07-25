

// _________________________Kendell script__________________________
        //  Can be toggled with my toggle button
        var switchStatus = false;
       
       

        // for (switchStatus = false, sw{

            const artyom = new Artyom();

            startContinuousArtyom();

            // This function activates artyom and will listen all that you say forever (requires https conection, otherwise a dialog will request if you allow the use of the microphone)
            function startContinuousArtyom(){
                artyom.fatality();// use this to stop any of

                setTimeout(function(){// if you use artyom.fatality , wait 250 ms to initialize again.
                    artyom.initialize({
                        lang:"en-GB",// A lot of languages are supported. Read the docs !
                        continuous:true,// Artyom will listen forever
                        listen:true, // Start recognizing
                        debug:true, // Show everything in the console
                        speed:1 // talk normally
                    }).then(function(){
                        console.log("Ready to work !");
                    });
                },250);
            }
            //user dict code

            var UserDictation = artyom.newDictation({
            continuous:true, // Enable continuous if HTTPS connection
            onResult:function(text){
                // Do something with the text
                console.log(text);
                $('#query').val(text.trim());
                searchMusic();
                return text;
            },
            onStart:function(){
                console.log("Dictation started by the user");
            },
            onEnd:function(){
                alert("Dictation stopped by the user");
                
            }
        });




        $("#togBtn").on('change', function() {
            if ($(this).is(':checked')) {
                switchStatus = $(this).is(':checked');
                startContinuousArtyom();
                UserDictation.start();
                alert(switchStatus);// To verify

            }
            else {
            switchStatus = $(this).is(':checked');
            UserDictation.stop();
            alert(switchStatus);// To verify
            }
        });	
