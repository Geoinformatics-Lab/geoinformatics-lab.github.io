/**
 * Kevon Adonis
 * Copyright 2013
 * http://www.wpabstracts.com
 */

jQuery(function(){
    alertify.maxLogItems(1).closeLogOnClick(true).logPosition("bottom right");;
});


function wp_field_validate(itemId, error) {
    var currentError = false;
    if(itemId !== undefined){
        itemId = itemId.replace('[]', '\\[\\]');
        var inputItem = jQuery('#' + itemId);
        if( inputItem.val() ==='') {
            console.log('Empty @ ', inputItem.attr('id'));
            inputItem.parent().addClass('has-error');
            currentError = true;
        }else{
            inputItem.parent().removeClass('has-error');
        }
    }
    return currentError + error;
}

function wp_radio_validate(itemName, error) {
    var currentError = false;
    if(itemName !== undefined){
        var inputItem = jQuery('input[name="' + itemName + '"]');
        var isValid = jQuery('input[name="' + itemName + '"]:checked').length;
        if(!isValid) {
            console.log('Empty @ ', itemName);
            inputItem.parent().parent().addClass('has-error');
            currentError = true;
        }else{
            inputItem.parent().parent().removeClass('has-error');
        }
    }
    return currentError + error;
}

function wpabstracts_add_attachment(parentId, maxAllowed) {
    jQuery('#'+ parentId).append('<div><input type="file" name="attachments[]"/></div>');
    var count = jQuery('input[name="attachments[]"]').length;
    if(count >= maxAllowed){
        jQuery('.add_attachments').remove();
    }
}

function wpabstracts_remove_attachment(id){
    var attachment_id = id;
    jQuery("#manage_attachments").append('<input type="hidden" name=\"abs_remove_attachments[]\" value ="'+ attachment_id +'">');
    jQuery("#attachment_"+attachment_id).remove();
}

function wpabstracts_validateAbstract() {
    var errors = false;
    var maxCount = jQuery('.max-word-count').text();
    var content = null;
    var count = 0;
    if(tinyMCE.activeEditor !== null){
        content = jQuery.trim(tinyMCE.activeEditor.getContent());
    }else{
        content = jQuery.trim(jQuery('#abstext').val());
    }
    if(content.length > 0){
        count = content.replace(/\s+/gi, ' ').split(' ').length;
    }
    if(count > maxCount){
        alertify.error("You have exceeded the maximum words allowed for this submission.");
        return;
    }

    jQuery("#abs_form input[type=text], select").not('.optional').each(function(){
        errors = wp_field_validate(jQuery(this).attr('id'), errors);
    });

    var abs_terms = jQuery("#abs_form input[name='abs_terms']");

    if(jQuery(abs_terms).length > 0 && !jQuery(abs_terms).prop('checked')){
        jQuery(abs_terms).parent().addClass('wpabstracts text-danger');
        errors = true;
    }else{
        jQuery(abs_terms).parent().removeClass('text-danger');
    }

    if(errors) {
        alertify.delay(0).error(front_ajax.fillin, 0);
    } else {
        jQuery('#abs_form').submit();
    }
}

function wpabstracts_validateUser() {
    var errors = false;
    jQuery("#wpa_profile_form input, select").each(function(){
        if(jQuery(this).parent().hasClass('required')){
            errors = wp_field_validate(jQuery(this).attr('id'), errors);
        }
    });

    var terms = jQuery("#terms_conditions");
    if(terms.prop('checked') === false) {
        terms.parent().addClass('has-error');
        errors = true;
    }else{
        terms.parent().removeClass('has-error');
    }

    if(errors) {
        alertify.delay(0).error(front_ajax.fillin, 0);
    } else {
        jQuery('#wpa_profile_form').submit();
    }

}

function wpabstracts_validateLogin(){
    var errors = false;
    jQuery("#wpa_login_form input[type='text'], input[type='password']").each(function(){
        if(jQuery(this).parent().hasClass('required')){
            errors = wp_field_validate(jQuery(this).attr('id'), errors);
        }
    });
    if(errors) {
        alertify.delay(0).error(front_ajax.fillin, 0);
    } else {
        jQuery('#wpa_login_form').submit();
    }
}

function wpabstracts_validateReview() {
    var errors = false;
    jQuery("#wpabs_review_form input[type=text], select").each(function(){
        errors = wp_field_validate(jQuery(this).attr('id'), errors);
    });

    jQuery("#wpabs_review_form input[type=radio]").each(function(){
        errors = wp_radio_validate(jQuery(this).attr('name'), errors);
    });

    var content = null;
    if(tinyMCE.activeEditor !== null){
        content = jQuery.trim(tinyMCE.activeEditor.getContent());
    }else{
        content = jQuery.trim(jQuery('#abs_comments').val());
    }
    if(content.length < 1) {
        errors = true;
        jQuery('#abs_review_comments_error').addClass('bg-danger');
    }
    else {
        jQuery('#abs_review_comments_error').removeClass('bg-danger');
    }
    if(errors) {
        alertify.delay(0).error(front_ajax.fillin, 0);
    } else {
        jQuery('#wpabs_review_form').submit();
    }

}

function wpabstracts_add_coauthor(){
    var author_box = jQuery('.author_box:first').clone();
    jQuery(author_box).find('input').val('');
    jQuery('#coauthors_table').append(author_box);
}

function wpabstracts_delete_coauthor(){
    if(jQuery("#coauthors_table .author_box").length > 1){
        jQuery('#coauthors_table').find(".author_box:last").remove();
    }
}

function wpabstracts_add_topic(){
    var html = '<p><input class="wpabstracts form-control" type="text" name="topics[]" id="topics[]" /></p>';
    jQuery('#topics_table').append(html);
}

function wpabstracts_delete_topic(){
    if(jQuery("#topics_table input").length > 1){
        jQuery('#topics_table').find("p input:last").remove();
    }
}

function wpabstracts_delete_abstract(id) {
    alertify.confirm(front_ajax.confirmdelete, function (e) {
        if (e) {
            if(location.pathname.indexOf('admin') >= 0){
                location.href = "?page=wpabstracts&tab=abstracts&task=delete&id="+id+"";
            }else{
                location.href = "?task=delete_abstract&id="+id+"";
            }
        }
    });
}

function wpabstracts_delete_review(id) {
    alertify.confirm(front_ajax.confirmdeleteReview, function (e) {
        if (e) {
            if(location.pathname.indexOf('admin') >= 0){
                location.href = "?page=wpabstracts&tab=reviews&task=delete&id="+id+"";
            }else{
                location.href = "?task=delete_review&id="+id+"";
            }
        }
    });
}

function wpabstracts_delete_attachment(id) {
    alertify.confirm(front_ajax.confirmdeleteAttachment, function (e) {
        if (e) {
            location.href = "?page=wpabstracts&tab=attachments&task=delete&id="+id+"";
        }
    });
}

function wpabstracts_delete_user(id) {
    alertify.confirm(front_ajax.confirmdeleteUser, function (e) {
        if (e) {
            location.href = "?page=wpabstracts&tab=users&task=delete&id="+id+"";
        }
    });
}

function wpabstracts_delete_event(id) {
    alertify.confirm(front_ajax.confirmdeleteEvent, function (e) {
        if (e) {
            location.href = "?page=wpabstracts&tab=events&task=delete&id="+id+"";
        }
    });
}


function wpabstracts_assign_reviewer(id){
    var data = {
        action: 'getreviewers',
        aid: id
    };

    jQuery.post(front_ajax.ajaxurl, data).done(function(modal){
        jQuery("body").append('<div id=\"assign_reviewer"></div>');
        jQuery("#assign_reviewer").html("").html(modal);
        jQuery("#assign_reviewer").dialog({
            'width'         : 550,
            'modal'         : true,
            'closeOnEscape' : true,
            'title': front_ajax.assign_reviewer,
            'closeText' : '',
                buttons: [
                {
                    text: "Assign Reviewers",
                    click: function() {
                        jQuery('#assign_form').submit();
                    },
                    "class":"wpabstracts btn btn-primary"
                }
            ]
        }).dialog('open');

        jQuery('#assign_reviewer select').off('change').on('change', function(){
            var $selects = jQuery('#assign_reviewer select');
            var existing = [];

            $selects.each(function(index, select){
                var val = jQuery(select).find('option:selected').val();
                if(val !== null && val !=="" && parseInt(val, 10) > 0){
                    existing.push(val);
                    jQuery(select).parent().parent().find('.wpabs_email:first').attr('checked', true);
                    jQuery(select).parent().parent().find('.wpabs_email:first').attr('disabled', false);
                }else{
                    jQuery(select).parent().parent().find('.wpabs_email:first').attr('checked', false);
                    jQuery(select).parent().parent().find('.wpabs_email:first').attr('disabled', true);
                }
            });

            $selects.children().each(function(index, option){
                var currentVal = jQuery(option).val();
                if(currentVal > 0){
                    if (jQuery.inArray(currentVal, existing) > -1) {
                    jQuery(option).hide();
                    }else{
                        jQuery(option).show();
                    }
                }
            });
        });

        jQuery('#assign_reviewer select').change();

    });
}

function wpabstracts_getTopics(id){
    var data = {
        action: 'loadtopics',
        event_id: id
    };
    jQuery.post(front_ajax.ajaxurl, data)
    .done(function(data){
        jQuery("#abs_topic").html(data);
    });
}

function wpabstracts_updateWordCount(){
    var content = null;
    var notified = false;
    var count = 0;
    var counter = jQuery('.abs-word-count');
    var maxCount = jQuery('.max-word-count').text();
    if('undefined' !== tinyMCE && tinyMCE.activeEditor !== null){
        content = tinyMCE.activeEditor.getContent();
    }else{
        content = jQuery('#abstext').val();
    }
    if(content.length > 0){
        count = content.split(' ').length;
    }
    counter.text(count + '. ' + (maxCount - count) + ' words remaining');
    if(count > maxCount && !notified){
        counter.css('color', 'red');
    }else{
         counter.css('color', 'green');
    }
}

function wpabstracts_validateTemplate(){
    var errors = false;
    jQuery("form#emailtemplate input[type=text]").each(function(){
        errors = wp_field_validate(jQuery(this).attr('id'), errors);
    });
    if(!jQuery("#email_body").val() ) {
       jQuery("#email_body").addClass('has-error');
       errors = true;
    }else {
        jQuery("#email_body").removeClass('has-error');
    }
    if(errors) {
       alertify.error(front_ajax.fillin, 0);
       //alert(front_ajax.fillin);
    } else {
        jQuery('#emailtemplate').submit();
    }
}

function wpabstracts_validateEvent() {
    var errors = false;
    jQuery("form#abs_event_form input[type=text]").each(function(){
        errors = wp_field_validate(jQuery(this).attr('id'), errors);
    });
    if(errors) {
        alertify.error(front_ajax.fillin, 0);
        //alert(front_ajax.fillin);
    } else {
        jQuery('#abs_event_form').submit();
    }

}

