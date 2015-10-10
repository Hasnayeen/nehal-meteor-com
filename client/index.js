Template.visitorName.onRendered(function () {
	var textToDisplay = this.$(".hide").text();
		this.$(".type").typed({
			strings: [textToDisplay],
			cursorChar: ""
		});
});


Template.visitorName.events({
	'keypress input': function (event) {
		if (event.which === 13) {
			var visitorName = $("#visitorName").val();
			if (visitorName == "") {
				Session.set("visitorName", "anonymous");
			} else {
				Session.set("visitorName", visitorName);
			}
			$(".type, #visitorName").remove();
			$("#connecting").text("connecting");
			$("#connecting-dot").typed({
				strings: ["....."],
				typeSpeed: 50,
				callback: function() {
					$("#connecting-dot").remove();
					$("#connecting").text("success!").delay(600).queue(function(){
						$(".terminal-container").remove();
						Blaze.render(Template.introText, $(".terminal-outer-container")[0]);
					});
				}
			});
		}
	}
});

Template.introText.onRendered(function() {
	if (Session.get("visitorName") == "anonymous") {
		var name = "Friend";
	} else {
		var name = Session.get("visitorName");
	}
	var line1 = "Hi " + name + " ! Nice to meet you.^800 Thanks for visiting.^300";
	var line2 = "I'm Nehal Hasnayeen^800, Full-stack Web Developer based in Dhaka.^300";
	var line3 = "Following are the tools I use in my everyday work.^300";
	this.$(".text").typed({
		strings: [line1, line2, line3, ""],
		typeSpeed: 50,
		backSpeed: -9000,
		callback: function() {
			$(".top-row").remove();
			Blaze.render(Template.tools, $("body")[0]);
		}
	});
});

Template.introText.helpers({
	'visitorName': function() {
		return Session.get("visitorName");
	}
})