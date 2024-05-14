/**
 * Kevon Adonis
 * Copyright 2013
 * http://www.wpabstracts.com
 */
/*
 * Allows multiple attachments to be removed
 */
function wpabstracts_add_attachment() {
    var container = document.createElement('div');
    var input = document.createElement('input');
    input.setAttribute('type','file');
    input.setAttribute('name','attachments[]');
    container.appendChild(input);
    document.getElementById('wpabstract_form_attachments').appendChild(container);
}
/*
 * Allows multiple attachments to be removed
 */
function wpabstracts_remove_attachment(id){
    var attachment_id = id;
    jQuery("#manage_attachments").append('<input type="hidden" name=\"abs_remove_attachments[]\" value ="'+ attachment_id +'">');
    jQuery("#attachment_"+attachment_id).remove();
}
/*
 * Validates and submit the Add Abstracts form
 */
function wpabstracts_validateAbstract() {
    var errors = false;
    if(document.getElementById('title').value=='') {
        errors = true;
        document.getElementById('title-prompt-text').style.color='red';
    }
    if(document.getElementById('abs_event').value == '') {
        errors = true;
        document.getElementById('abs_event_error').style.display='inline';
    }
    else {
        document.getElementById('abs_event_error').style.display='none';
    }
    if(document.getElementById('abs_topic').value == '') {
        errors = true;
        document.getElementById('abs_event_error').style.display='inline';
    }
    else {
        document.getElementById('abs_event_error').style.display='none';
    }
    if((document.getElementById('abs_author[]').value=='') ||
        (document.getElementById('abs_author_email[]').value=='') ||
        (document.getElementById('abs_author_affiliation[]').value=='')){
        errors = true;
        document.getElementById('abs_author_error').style.display='inline';
    } else {
        document.getElementById('abs_author_error').style.display='none';
    }
    if((document.getElementById('abs_presenter').value=='') ||
        (document.getElementById('abs_presenter_email').value=='') ||
        (document.getElementById('abs_presenter_preference').value=='')) {
        errors = true;
        document.getElementById('abs_presenter_error').style.display='inline';
    } else {
        document.getElementById('abs_presenter_error').style.display='none';
    }
    if(errors) {
        alert(front_ajax.fillin);
    } else {
        document.getElementById('abs_form').submit();
    }

}
/*
 * Validates and submits the Add Event form
 */
function wpabstracts_validateEvent() {
    var errors = false;
    if(document.getElementById('title').value=='') {
        errors = true;
        document.getElementById('title-prompt-text').innerHTML = front_ajax.name_event ;
        document.getElementById('title-prompt-text').style.color = "red";
    }
    if(
    (document.getElementById('abs_event_host').value=='') ||
        (document.getElementById('abs_event_address').value=='') ||
        (document.getElementById('abs_event_start').value=='') ||
        (document.getElementById('abs_event_end').value=='')) {
        errors = true;
        document.getElementById('abs_event_host_error').style.display='inline';
    }
    else {
        document.getElementById('abs_event_host_error').style.display='none';
    }
    if(document.getElementById('topics[]').value=='') {
        errors = true;
        document.getElementById('abs_topic_error').style.display='inline';
    }
    else {
        document.getElementById('abs_topic_error').style.display='none';
    }
    if(errors) {
        alert(front_ajax.fillin);
    } else {
        document.getElementById('abs_event_form').submit();
    }

}
/*
 * Validates and submits the Add Review form
 */
function wpabstracts_validateReview() {
    var errors = false;
    if(
    (!jQuery("input[name='abs_relevance']:checked").val()) ||
        (!jQuery("input[name='abs_quality']:checked").val()) ||
        (!jQuery("input[name='abs_recommendation']:checked").val()) ||
        (!jQuery("input[name='abs_status']:checked").val()) )  {
        errors = true;
        document.getElementById('abs_submit_review_error').style.display='inline';
    }
    else {
        document.getElementById('abs_submit_review_error').style.display='none';
    }
    if(!jQuery("#abs_comments").val()) {
        errors = true;
        document.getElementById('abs_review_comments_error').style.display='inline';
    }
    else {
        document.getElementById('abs_review_comments_error').style.display='none';
    }
    if(errors) {
        alert(front_ajax.fillin);
    } else {
        document.getElementById('wpabs_review_form').submit();
    }

}
/*
 * Validates new user additions
 */
function wpabstracts_validateUser(){
    var errors = false;
    if(document.getElementById('first_name').value=='') {
        errors = true;
        document.getElementById('firstname_error').style.display='inline';
        document.getElementById('firstname_error').style.color='red';
    }
    else {
        document.getElementById('firstname_error').style.display='none';
    }
    if(document.getElementById('last_name').value == '') {
        errors = true;
        document.getElementById('lastname_error').style.display='inline';
        document.getElementById('lastname_error').style.color='red';
    }
    else {
        document.getElementById('lastname_error').style.display='none';
    }
    if(document.getElementById('username').value == '') {
        errors = true;
        document.getElementById('username_error').style.display='inline';
        document.getElementById('username_error').style.color='red';
    }
    else {
        document.getElementById('username_error').style.display='none';
    }
    if(document.getElementById('password').value == '') {
        errors = true;
        document.getElementById('password_error').style.display='inline';
        document.getElementById('password_error').style.color='red';
    }
    else {
        document.getElementById('password_error').style.display='none';
    }
    if(document.getElementById('email').value == '') {
        errors = true;
        document.getElementById('email_error').style.display='inline';
        document.getElementById('email_error').style.color='red';
    }
    else {
        document.getElementById('email_error').style.display='none';
    }
    if(document.getElementById('user_level').value == '') {
        errors = true;
        document.getElementById('userlevel_error').style.display='inline';
        document.getElementById('userlevel_error').style.color='red';
    }
    else {
        document.getElementById('userlevel_error').style.display='none';
    }
    if(errors) {
       alert(front_ajax.fillin);
    } else {
        document.getElementById('new_user').submit();
    }

}
/*
 * Allows for multiple co-authors to be added
 */
function wpabstracts_add_coauthor(){
    var html = '<tr class="abstract_form_table_row">' +
        '<td class="abstract_form_table_label">'+front_ajax.authorName+'</td>' +
        '<td><input type="text" name="abs_author[]" id="abs_author[]"/></td>' +
        '</tr>' +
        '<tr class="abstract_form_table_row">' +
        '<td class="abstract_form_table_label">'+front_ajax.authorEmail+'</td>' +
        '<td><input type="text" name="abs_author_email[]" id="abs_author_email[]" value="" /></td>' +
        '</tr>' +
        '<tr class="abstract_form_table_row">' +
        '<td class="abstract_form_table_label">'+front_ajax.affiliation+'</td>' +
        '<td><input type="text" name="abs_author_affiliation[]" id="abs_author_affiliation[]" value="" /></td>' +
        '</tr>';
    jQuery('#coauthors_table').append(html);
}
/*
 * Allows for multiple co-authors to be removed
 */
function wpabstracts_delete_coauthor(){
    if(jQuery("#coauthors_table tr").length !== 3){
        for(var i = 0; i < 3; i++){
            jQuery('#coauthors_table').find("tr:last").remove();
        }
    }
}
/*
 * Allows for multiple topics to be added
 */
function wpabstracts_add_topic(){
    var html = '<tr>' +
        '<td>'+ front_ajax.topic +'</td>' +
        '<td><input type="text" name="topics[]" id="topics[]"/></td>' +
        '</tr>';
    jQuery('#topics_table').append(html);
}
/*
 * Allows for multiple topic to be removed
 */
function wpabstracts_delete_topic(){
    jQuery('#topics_table').find("tr:last").remove();
}



function confirm_abstract_delete(id) {
    if(confirm(front_ajax.confirmdelete)) {
        location.href = "?page=wpabstracts&tab=abstracts&task=delete&id="+id+"";
    }
}

function confirm_review_delete(id) {
    if(confirm(front_ajax.confirmdeleteReview)) {
        location.href = "?page=wpabstracts&tab=reviews&task=delete&id="+id+"";
    }
}

function confirm_event_delete(id) {
    if(confirm(front_ajax.confirmdeleteEvent+' '+ name + front_ajax.hostedby +' '+ host + '?')) {
        location.href = "?page=wpabstracts&tab=events&task=delete&id="+id+"";
    }
}

function confirm_delete_user(name, id) {
    if(confirm(front_ajax.confirmdeleteEvent+' '+  name + ' ?')) {
        location.href = "?page=wpabstracts&tab=users&task=delete&name="+name+"&id="+id+"";
    }
}

function assignReviewer(id){
    var data = {
        action: 'getreviewers',
        aid: id
    };
    jQuery.post(ajaxurl, data).done( function(data){
        jQuery(".wrap").append('<div id=\"assign_reviewer"></div>');
        jQuery("#assign_reviewer").html(data).dialog({
            'dialogClass'   : 'wp-dialog',
            'modal'         : true,
            'closeOnEscape' : true,
            title: front_ajax.assign_reviewer
        }).dialog('open');

    });
}

function manageReview(abs_id){
    var data = {
        action: 'managereviews',
        abstract_id: abs_id
    };
    jQuery.post(ajaxurl, data).done(
    function(data){
        if(!(data == 0)){   // reviews exists
            jQuery(".wrap").append('<div id=\"absDialog"></div>');
            jQuery("#absDialog").html(data).dialog({
                'dialogClass'   : 'wp-dialog',
                'modal'         : true,
                'closeOnEscape' : true,
                title: front_ajax.review_alert
            }).dialog('open');
        }else{  // add new review
            location.href = "?page=wpabstracts&tab=reviews&task=new&id="+abs_id;
        }
    });
}

function wpabstracts_getTopics(id){
    var data = {
        action: 'loadtopics',
        event_id: id
    };
    jQuery.post(front_ajax.ajaxurl, data)
    .done(function(data){
        jQuery("#abs_topic").append(data);
    });
}