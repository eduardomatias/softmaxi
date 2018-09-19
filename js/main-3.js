/*--------------------------------------------
 /* Common Scripts for App Landing Page Demo 3
 /*
 ----------------------------------------------
 */
(function ($) {
    "use strict";

    /*----------------------------------------------------*/
    /*  SECONDARY NAVIGATION
     /*----------------------------------------------------*/
    var primaryNav = $('.nav').html();
    var secondaryNav = $('.secondary-menu-area');
    var openIcon = $('#nav-trigger-2');
    var closeIcon = $('i.close-icon');

    if (($('.secondary-menu').has('li').length === 0)) {
        $(primaryNav).appendTo('.secondary-menu');
    }
    $(openIcon).on('click', function () {
        $(secondaryNav).toggleClass('secondary-menu-open');
        $(closeIcon).toggleClass('animated zoomIn');
        return false;
    });
    $(closeIcon).on('click', function () {
        if (secondaryNav.hasClass('secondary-menu-open')) {
            $(secondaryNav).removeClass('secondary-menu-open');
            $(closeIcon).toggleClass('animated zoomIn');
        }
    });
    $('.secondary-menu li a').on('click', function () {
        setTimeout(
                function () {
                    $(secondaryNav).removeClass('secondary-menu-open');
                    $(closeIcon).toggleClass('animated zoomIn');
                },
                1000);
    });

    /*----------------------------------------------------*/
    /*  Change Active State on Scroll - For secondary Menu */
    /*----------------------------------------------------*/
    $(window).on('scroll', function () {
        var y = $(this).scrollTop();
        $('.secondary-menu li a[href*=#]:not([href=#])').each(function (event) {
            if (y >= $($(this).attr('href')).offset().top - 100) {
                $('.secondary-menu li a').parent().not(this).removeClass('active');
                $(this).parent().addClass('active');
            }
        });
    });

    /*----------------------------------------------------*/
    /*  Owl Carousel - CUSTOMER FEEDBACK */
    /*----------------------------------------------------*/
    var feedbackSlider = $('.feedback-slider');
    feedbackSlider.owlCarousel({
        items: 1,
        nav: false,
        dots: true,
        autoplay: true,
        loop: true,
        mouseDrag: false,
        touchDrag: true,
        navText: ["<i class='icofont icofont-long-arrow-left'></i>", "<i class='icofont icofont-long-arrow-right'></i>"],
        responsive: {
            // breakpoint from 1000 up
            992: {
                nav: true,
                dots: false
            }
        }
    });

    feedbackSlider.on("translate.owl.carousel", function () {
        $(".feedback-slider-item h3").removeClass("animated fadeIn").css("opacity", "0");
        $(".feedback-slider-item img, .feedback-slider-thumb img, .customer-rating").removeClass("animated zoomIn").css("opacity", "0");
    });

    feedbackSlider.on("translated.owl.carousel", function () {
        $(".feedback-slider-item h3").addClass("animated fadeIn").css("opacity", "1");
        $(".feedback-slider-item img, .feedback-slider-thumb img, .customer-rating").addClass("animated zoomIn").css("opacity", "1");
    });


    feedbackSlider.on('changed.owl.carousel', function (property) {
        var current = property.item.index;
        var prevThumb = $(property.target).find(".owl-item").eq(current).prev().find("img").attr('src');
        var nextThumb = $(property.target).find(".owl-item").eq(current).next().find("img").attr('src');
        var prevRating = $(property.target).find(".owl-item").eq(current).prev().find('span').attr('data-rating');
        var nextRating = $(property.target).find(".owl-item").eq(current).next().find('span').attr('data-rating');
        $('.thumb-prev').find('img').attr('src', prevThumb);
        $('.thumb-next').find('img').attr('src', nextThumb);
        $('.thumb-prev').find('span').next().html(prevRating + '<i class="icofont icofont-star"></i>');
        $('.thumb-next').find('span').next().html(nextRating + '<i class="icofont icofont-star"></i>');
    });
    $('.thumb-next').on('click', function () {
        feedbackSlider.trigger('next.owl.carousel', [300]);
        return false;
    });
    $('.thumb-prev').on('click', function () {
        feedbackSlider.trigger('prev.owl.carousel', [300]);
        return false;
    });

    /*----------------------------------------------------*/
    /*  Form Contato   */
    /*----------------------------------------------------*/
    var formContato = $('#form-contato');
    formContato.submit(function () {
        var nome = formContato.find('input[name=nome]').val();
        var email = formContato.find('input[name=email]').val();
        var assunto = formContato.find('input[name=assunto]').val();
        var mensagem = formContato.find('textarea[name=mensagem]').val();
        $.ajax({
            url: 'enviar.php',
            type: 'POST',
            dataType: 'json',
            data: {nome, email, assunto, mensagem}
        })
                .done(function () {
                    console.log("success");
                })
                .fail(function () {
                    console.log("error");
                })
                .always(function (a) {
                    console.log("complete");
                    console.log(a);
                    if (typeof a === "string") {
                        alert(a);
                    } else {
                        alert('MENSAGEM ENVIADA!');
                        formContato.find('input[name=nome]').val('');
                        formContato.find('input[name=email]').val('');
                        formContato.find('input[name=assunto]').val('');
                        formContato.find('textarea[name=mensagem]').val('');
                    }
                });

    });

    /*----------------------------------------------------*/
    /*  Modal - segmentos   */
    /*----------------------------------------------------*/
    $('#segmentosModal').on('shown.bs.modal', function () {
        var htmlModal = $('#segmentosModal .modal-content');
        htmlModal.html('');
        htmlModal.load('segmentos/' + $(this).data('segmento') + '.html');
    });

}(jQuery));