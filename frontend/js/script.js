window.onload = function () {


    /** При скроле страницы отображает шапку сайта */
    let body = document.querySelector('body');
    let header =$('.header');
    let logo = document.querySelector('.logo');
    let headerHeight = header.height();
    
    document.addEventListener('scroll', function(){
        if(window.pageYOffset >= headerHeight * 3){
            if(!header.hasClass('fixed')){
                header.addClass('fixed');
                header.hide();
                body.style.marginTop = headerHeight + 'px';
                header.fadeIn(500);
            }
            if(screen.width < 480)
                logo.style.display = 'none';
        }
        else {
            header.removeClass('fixed');
            body.style.marginTop = '';
            logo.style.display = 'flex';
        }
    })


    /** Скрывает список услуг */
    let servicesItem = $('.servicesItem').slice(3).hide();
    
    /** При клике на кнопку "moreService" раскрывает список услуг */
    let moreService = $( '#moreService' ).on('click', function( event ) {
        event.preventDefault();
        servicesItem.fadeIn(1000);
        moreService.hide();
      });

    /**Модальное окно */
    let modalDilog = $('.modal-dilog');
    let modalContent = document.querySelector('.modal__content');
    let modalHeader = document.querySelector('.modal__header');
    
    $('.serviceItem-js').on('click', function(event){
        event.preventDefault();
        let serviceName = event.target.parentElement.children[0].innerHTML;
        let dataLib = event.target.getAttribute('data-lib');
        let innerList = "";

        if(dataLib){
            modalLib[dataLib].forEach(value => {
                innerList += `
                <div class="modal-service">
                    <div class="modal-service__name">${value.name}</div>
                    <div class="modal-service__price">${value.price}</div>
                </div>
                `;
            })
        }

        modalHeader.innerHTML = serviceName;
        modalContent.innerHTML = innerList;
        modalDilog.fadeIn(500);
        body.style.overflow = "hidden";

    });

    /** Скрывает модальное окно */
    $('.modal__close').on('click', function(event){
        event.preventDefault();
        modalDilog.fadeOut(500);
        body.style.overflow = "";
    });

    modalDilog.on('click', function(event){
        if ($(event.target).closest('.modal').length == 0) {
            $(this).fadeOut(500);
            body.style.overflow = "";					
		}
    });

    /** Акция счетчик */

    let hourBlock = document.querySelector('.timer__clock__hour'),
        minuteBlock = document.querySelector('.timer__clock__minute'),
        secondBlock = document.querySelector('.timer__clock__second');

    function clock() {
        let date = new Date();

        let h = 24 - date.getHours(),
            m = 60 - date.getMinutes(),
            s = 60 - date.getSeconds();

        function bit(x) {
            x = x.toString();
            return x.length < 2 ? '0' + x : x;
        }

        hourBlock.innerHTML = bit(h);
        minuteBlock.innerHTML = bit(m);
        secondBlock.innerHTML = bit(s);

    }

    clock();
    setInterval(clock, 1000);

    /** COMMENT */

    $(".owl-carousel").owlCarousel({
        loop:true,
        margin:30,
        nav:true,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            768:{
                items:2
            },
        }
    });
    
/**Устанавливает курсор в начало инпута */
    $.fn.setCursorPosition = function(pos) {
        if ($(this).get(0).setSelectionRange) {
            $(this).get(0).setSelectionRange(pos, pos);
        } else if ($(this).get(0).createTextRange) {
            let range = $(this).get(0).createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
      };

    $('input[type="tel"]').click(function(){
        $(this).setCursorPosition(4);  // set position number
    });

    /**Запрещает ввод спец символов в поле */
    function validate(evt) {
        let theEvent = evt || window.event;
        let key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode( key );
        let regex = /[[А-я\A-z]/;
        if( !regex.test(key) ) {
            theEvent.returnValue = false;
            if(theEvent.preventDefault) theEvent.preventDefault();
        }
    }

    $("input[type='text']").on('keypress', function (event) {
        validate(event);
    });
    $("input[type='text']").on('paste', function (event) {
        validate(event);
    });
    
    //E-mail Ajax Send
    $("input[type='tel']").mask("+7 (999) 999 99 99?9");

    $(".form_js").submit(function(event) { //Change
        event.preventDefault();
        let th = $(this);
		$.ajax({
			type: "POST",
			url: "./../mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});
}