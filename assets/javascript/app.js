var apiUrl = "https://www.omdbapi.com/",
    $templates = $("template"),
    $partialViewPlaceholder = $("#partial-view");

var tempQs = ["Ans 0 lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt vel ullam nobis provident maxime, repellendus animi. Rem quo velit id, suscipit accusamus aliquid maxime tempore cumque deserunt, mollitia eligendi eum.",
              "Ans 1 lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt vel ullam nobis provident maxime, repellendus animi. Rem quo velit id, suscipit accusamus aliquid maxime tempore cumque deserunt, mollitia eligendi eum.",
              "Ans 2 lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt vel ullam nobis provident maxime, repellendus animi. Rem quo velit id, suscipit accusamus aliquid maxime tempore cumque deserunt, mollitia eligendi eum.",
              "Ans 3 lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt vel ullam nobis provident maxime, repellendus animi. Rem quo velit id, suscipit accusamus aliquid maxime tempore cumque deserunt, mollitia eligendi eum."]


function appendQButton(qNum, element) {
    var tempElement = $("<button>");
    tempElement.addClass("'btn btn-danger btn-block'");
    tempElement.attr("id", "button" + qNum);
    tempElement.text(tempQs[i]);
    element.append(tempElement);
}


function loadQATemplate(e) {
    var t = $templates.filter("#tmpl-QAs").html(),
        a = $(t);
    $partialViewPlaceholder.empty().append(a);
    $("#question-text").text("How many otters does it take to change a lightbulb when there are seven moons around the planet Jupiter and both almonds speculate the rise and fall of the cornish hen?")

    for (i = 0; i < 4; i++) {
        appendQButton(i, a);
    }
}

$(document).on("click", ".btn", function() {
    console.log("future use, clicked ", this.id)
})

var triviaQAs;
$.ajax({ url: apiUrl }).done(loadQATemplate);
