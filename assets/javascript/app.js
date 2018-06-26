// $(document).ready(function () {
/////////////Topic Object///////////////////

var topics = [

    {
        topicName: "Animals",
        topicItems: ["cat", "dog", "bird", "bear", "lion","tiger","elephant","panda","owl","duck","bat","frog"]
    },

    {
        topicName: "Cars",
        topicItems: ["audi", "bmw", "bugatti", "ferrari", "benz","lexus","aston martin","ford","buick","chevrolet","jeep","jaguar"]
    },
    {
        topicName: "Celebrities",
        topicItems: ["Johnny Depp", "Arnold Schwarzenegger", "Jim Carrey", "Leonardo DiCaprio", "Tom Cruise","Brad Pitt","Charles Chaplin","Cameron Diaz"," Kate Winslet","Angelina Jolie","Jessica Alba","Nicolas Cage"]
    },
    {
        topicName: "Movies",
        topicItems: ["The Godfather", "Raging Bull", "Casablanca", "Gone with the Wind", "Vertigo","On the Waterfront","Forrest Gump","Amadeus","Gladiator","Titanic","Unforgiven","Rocky"]
    },
    {
        topicName: "Games",
        topicItems: ["Minecraft", "The Sims", "Myst", "Age of Empires", "Command & Conquer","Counter-Strike","SimCity","Quake","Deer Hunter","Unreal","Tropico","Space Engineers"]
    },
    {
        topicName: "Drinks",
        topicItems: ["VODKA", "TEQUILA", "RUM", "beer", "WHISKEY","CHAMPAGNE","hennessy","bacardi","chivas regal","grants","jack daniels","captain morgan"]
    },
    {
        topicName: "Countries",
        topicItems: ["canada", "china", "iran", "india", "malaysia","japan","usa","russia","egypt","brazil","italia","norway"]
    },

    {
        topicName: "Fruits",
        topicItems: ["apple", "orange", "banana", "pineapple", "cucumber","cherry","kiwi","lemon","lime","coconut","apricot","avocado"]
    },

    
];
///////////////End of Topic Object///////////
$(".categoryName").text(topics[0].topicName)
// console.log(topics)

var topicNameArray=[];
for (var i=0;i<topics.length;i++){
topicNameArray[i]=topics[i].topicName
}
// console.log(topicNameArray);
/////////////////////Topic Selector////////////////////

$.each(topics, function () {
    var optMkr=$("<option>");
   
   optMkr.addClass("items")
   optMkr.text(this.topicName)
   optMkr.attr("data-name",this.topicName)
   $("#topicsId").append(optMkr)
    
});


/////////////////////End of Topic Selector////////////////////

//////////////////////Topic to Array selector//////////////////
var itemTopic=topics[0].topicName;
// console.log("itemTopic: "+itemTopic)
var topicItemsEntry=topics[0].topicItems;



$("#topicsId").change(function(){
    $(".imgArea").empty();
    $("#item-input").val("")

    itemTopic=$("#topicsId option:selected").attr("data-name");

    $(".categoryName").text(itemTopic)
    // console.log("itemTopic: "+itemTopic)
    // topicItemsEntry=
    var topicIndex = topicNameArray.indexOf(itemTopic);
    topicItemsEntry=topics[topicIndex].topicItems;
    // console.log("index is: "+topicIndex)
    // console.log("itemTopic entry: "+topicItemsEntry)
    renderButtons();

})


    ///////////////Render Button//////////


    function renderButtons() {

        $("#buttons-view").empty();


        for (var i = 0; i < topicItemsEntry.length; i++) {


            var BtnMkr = $("<button>");

            BtnMkr.addClass("btn btn-primary item-btn border border-dark");
            BtnMkr.attr("type", "submit");

            BtnMkr.attr("data-name", topicItemsEntry[i]);

            BtnMkr.text(topicItemsEntry[i]);


            // type="submit" class="btn btn-primary submit"

            $("#buttons-view").append(BtnMkr);

        }

    }

    renderButtons();

    ////////////////////End of render button/////////////////////////

    ///////////////add item buttons/////////////

    $("#add-item").on("click", function (event) {

        event.preventDefault();



        var itemCheck = $("#item-input").val().trim().toLowerCase();
        if (itemCheck !== "" && $.inArray(itemCheck, topicItemsEntry) == -1) {
            newItem = $("#item-input").val().trim().toLowerCase();
            topicItemsEntry.push(newItem);
            renderButtons();
            // console.log($("#item-input").val())
            $("#item-input").val("")
        }

        $("#item-input").val("")


    })


    /////////////////end of item buttons////////////////////////////////

    /////////////////item Show/////////////////////

    var myAPI = "gOTqEakr9peRuYj037Qe6HcAE3YrYh1w";
    // var myAPI = "trilogy";
    var limitItem = topics[0].topicItems.length;

    function itemDisp() {
        $(".imgArea").empty();
        
        var start = "off"
        // stopStart();
        

        

        var item = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + item + "&limit=" + limitItem + "&api_key=" + myAPI;

        // console.log(queryURL)


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response)
            // console.log(response.data[0].rating)
            // console.log(response.data[0].images.fixed_height_still.url)
            // console.log(response.data[0].images.fixed_height.url)
            var itemCard = [];
            var itemCardBody = [];
            var rating = "";
            var itemCardText = [];


            for (var i = 0; i < limitItem; i++) {

                ///////////////////Making Image Cards/////////////////////////////////////
                itemCard[i] = $("<div>").addClass("border border-danger card")



                $(".imgArea").each(function () {
                    $(this).append(itemCard);
                });


                itemCardBody = $("<div>").addClass('card-body')

                $(".card").each(function () {
                    $(this).append(itemCardBody);
                });


                itemCardText = $("<p class='card-text'>").text("Rating: " + response.data[i].rating);

                $(".card-body").each(function () {
                    $(this).append(itemCardText);
                });


                /////////////Image DOM//////////////

                var itemImageDOM = $("<img class='card-img-top gifImg'>");
                var imgURL = response.data[i].images.fixed_height_still.url;
                var itemImgDataStill = response.data[i].images.fixed_height_still.url;
                var itemImgDataAnimate = response.data[i].images.fixed_height.url;
                var itemImgDataState = "still";
                var itemImgSrc = $(itemImageDOM).attr("src", imgURL);
                var itemImgStill = $(itemImageDOM).attr("data-still", itemImgDataStill);
                var itemImgAnimate = $(itemImageDOM).attr("data-animate", itemImgDataAnimate);
                var itemImgState = $(itemImageDOM).attr("data-state", itemImgDataState);
                // var itemImgClass = $(itemImageDOM).addClass("card-img-top gifImg");
                var itemImgAlt = $(itemImageDOM).attr("alt", "Card image cap");//should be the name of image button
                $(".card").each(function () {
                    $(this).append(itemImageDOM);
                });

            }


            gifAnimator()
        })
    };
    /////////////////end of Ajax call////////////////////////////   


    //////////////////gif animator///////////////////////

    function gifAnimator() {
        $(".gifImg").on("click", function () {

            var state = $(this).attr("data-state")
            var dynaSource;

            // console.log(state)


            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));

                $(this).attr("data-state", "animate");
            }
            else {
                $(this).attr("src", $(this).attr("data-still"));

                $(this).attr("data-state", "still");

            }

        });
    };



    /////////////////end of gif animator////////////////////



    ////////////////////////Button Click for item Show////////////

    $(document).on("click", ".item-btn", itemDisp);
    ////////////////////////end of Button Click for item Show////////////
    
    //////////////////////////////////start All/////////////////////////////////


    ///////////////add item buttons/////////////
    var start = "off"
    $("#stop-start-item").on("click", function (event) {
        event.preventDefault();
        stopStart()

        

    })


    /////////////////end of item buttons////////////////////////////////

    function stopStart() {

        if (start === "off") {

            $(".gifImg").each(function () {
                // $(this).append(itemCard);


                $(this).attr("src", $(this).attr("data-animate"));

                $(this).attr("data-state", "animate");

            });

            start = "on"

            $(".stop-start").text("Stop All").toggleClass('btn-primary btn-danger');

            //  css({"background-color":"red"});
            // console.log(start)

        }
        else {
            $(".gifImg").each(function () {
                $(this).attr("src", $(this).attr("data-still"));

                $(this).attr("data-state", "still");
            });
            start = "off"
            $(".stop-start").text("Animate All").toggleClass('btn-danger btn-primary');

        }

    }

    //End of Document Ready//////////    
// });