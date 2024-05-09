jQuery(document).ready(function() {
	
	var moretext = "Read More";
	var lesstext = "less";
	
	jQuery(".morelink").click(function(){
			
		if(jQuery(this).hasClass("less")) {
			jQuery(this).removeClass("less");
			jQuery(this).html(moretext);
		} else {
			moretext = jQuery( this ).text();
			
			jQuery(this).addClass("less");
			jQuery(this).html(lesstext);
		}
		jQuery(this).parent().prev().toggle();
		jQuery(this).prev().toggle();
		return false;
	});
});