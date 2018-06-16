function htmlbodyHeightUpdate() {
    var height3 = $(window).height()
    var height1 = $('.nav').height() + 50
    height2 = $('.main').height()
    if (height2 > height3) {
        $('html').height(Math.max(height1, height3, height2) + 10);
        $('body').height(Math.max(height1, height3, height2) + 10);
    }
    else {
        $('html').height(Math.max(height1, height3, height2));
        $('body').height(Math.max(height1, height3, height2));
    }

}

// document.getElementById('txtInput').value = 'some text'
$(document).ready(function () {

    // $(function () {
    //     $('#datetimeEN').datetimepicker({
    //         format: 'LL',
    //         locale: 'en',
    //         defaultDate: 
    //     });
    // });

    // $('#datetimeEN').on('dp.change', function () {
    //     if ($('#datetimeEN input').val()) {
    //         var time = moment($('#timeEN').val()).valueOf()
    //         moment.locale('zh-TW')
    //         var zhtime = moment(time).format("LL");
    //         $('#timeTW').val(zhtime);
    //         console.log();
    //     }
    // });

    // $('#datetimepickerEN').on('dp.change', function () {
    //     if ($('#datetimepickerEN input').val()) {
    //         // var time = moment($('#timeEN').val()).valueOf()
    //         var time = moment($('#timeEN').val()).format();
    //         $('#dateTime').val(time);
    //         console.log($('#dateTime').val())
    //         moment.locale('zh-TW')
    //         var zhtime = moment(time).format("YYYY/MM/DD");
    //         $('#timeTW').val(zhtime);
    //         console.log();
    //     }
    // });
    // $("#datetimepickerEN").val('!{doc.eventTimeEN}').change()
    // console.log('!{doc.eventTimeEN}')



    htmlbodyHeightUpdate()
    $(window).resize(function () {
        htmlbodyHeightUpdate();
    });
    $(window).scroll(function () {
        height2 = $('.main').height()
        htmlbodyHeightUpdate()
    });
});



// $(document).ready(function () {

//     $('.summernote-tw-1').summernote({
//         placeholder: "中文 content 1",
//         height: 150,a
//         maxheight: null,
//         minheight: null,
//         toolbar: [
//             // [groupName, [list of button]]
//             ['style', ['bold', 'italic', 'underline', 'clear']],
//             ['font', ['strikethrough', 'superscript', 'subscript']],
//             ['fontsize', ['fontsize']],
//             ['color', ['color']],
//             ['para', ['ul', 'ol', 'paragraph']],
//         ]
//     });

//     $('.summernote-en-1').summernote({
//         placeholder: "English content 1",
//         height: 150,
//         maxheight: null,
//         minheight: null,
//         toolbar: [
//             // [groupName, [list of button]]
//             ['style', ['bold', 'italic', 'underline', 'clear']],
//             ['font', ['strikethrough', 'superscript', 'subscript']],
//             ['fontsize', ['fontsize']],
//             ['color', ['color']],
//             ['para', ['ul', 'ol', 'paragraph']],
//         ]
//     });

//     $('.summernote-tw-2').summernote({
//         placeholder: "中文 content 2",
//         height: 150,
//         maxheight: null,
//         minheight: null,
//         toolbar: [
//             // [groupName, [list of button]]
//             ['style', ['bold', 'italic', 'underline', 'clear']],
//             ['font', ['strikethrough', 'superscript', 'subscript']],
//             ['fontsize', ['fontsize']],
//             ['color', ['color']],
//             ['para', ['ul', 'ol', 'paragraph']],
//         ]
//     });

//     $('.summernote-en-2').summernote({
//         placeholder: "English content 2",
//         height: 150,
//         maxheight: null,
//         minheight: null,
//         toolbar: [
//             // [groupName, [list of button]]
//             ['style', ['bold', 'italic', 'underline', 'clear']],
//             ['font', ['strikethrough', 'superscript', 'subscript']],
//             ['fontsize', ['fontsize']],
//             ['color', ['color']],
//             ['para', ['ul', 'ol', 'paragraph']],
//         ]
//     });

//     $('.summernote-tw-3').summernote({
//         placeholder: "中文 content 3",
//         height: 150,
//         maxheight: null,
//         minheight: null,
//         toolbar: [
//             // [groupName, [list of button]]
//             ['style', ['bold', 'italic', 'underline', 'clear']],
//             ['font', ['strikethrough', 'superscript', 'subscript']],
//             ['fontsize', ['fontsize']],
//             ['color', ['color']],
//             ['para', ['ul', 'ol', 'paragraph']],
//         ]
//     });

//     $('.summernote-en-3').summernote({
//         placeholder: "English content 3",
//         height: 150,
//         maxheight: null,
//         minheight: null,
//         toolbar: [
//             // [groupName, [list of button]]
//             ['style', ['bold', 'italic', 'underline', 'clear']],
//             ['font', ['strikethrough', 'superscript', 'subscript']],
//             ['fontsize', ['fontsize']],
//             ['color', ['color']],
//             ['para', ['ul', 'ol', 'paragraph']],
//         ]
//     });
// });

