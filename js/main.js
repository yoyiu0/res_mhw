$(document).ready(function(){
    // 내비게이션(GNB)
    // 만약 윈도우의 가로길이가 1280이상이면 pc버전으로 메뉴가 나타나고,
    // 윈도우의 가로 길이가 1280미만이면 모방리 버전 메누가 나타남
    if($(window).width() >=1280){
      // PC버전
      // 주메뉴에 마우스 오버하면 서브메뉴와 배경 나타남
      $('nav > ul > li').hover(function(){
        $('.sub').stop().slideDown(300);
        $('.sub_bg').addClass('active');
        $('header').addClass('minimize');
      });
      // header에서 마우스 아웃하면 서브메뉴와 배경 사라짐
      $('header').mouseleave(function(){
        $('.sub').stop().slideUp(300);
        $('.sub_bg').removeClass('active');
      });







    }else{
      // 모바일 버전
      // 주메뉴에 클릭이벤트 설정
      $('nav > ul > li > a').click(function(){
        // a태그의 다음 객체인 ul.sub가 slideToggle됨
        $(this).next().slideToggle();
        // 클릭하지 않은 a객체의 ul.sub는 slideup됨
        $('nav > ul > li > a').not(this).next().slideUp();
        // 클릭한 주메누에 active클래스를 추가하거나 제거
        $(this).toggleClass('active');
        // 클릭하지 않은 주메뉴는 active
        $('nav > ul > li > a').not(this).removeClass('active');
        return false;
      });
      // header의 메뉴 버튼을 클릭하면 내비게이션 나타나고, 다시 클릭하면 내비게이션 들어감
      let menu_sw=0;
      $('.menu_btn').click(function(e){
        e.preventDefault();
        if(menu_sw==0){
          menu_sw=1;
          $('nav').animate({'right':0});
          $('header').addClass('minimize')
          // 화면고정
          $('html,body').css('overflow','hidden');
        }else{
          menu_sw=0;
          $('nav').animate({'right':'-100%'});
          // 화면 고정 해제
          $('html, body').css('overflow-y','scroll');
        }
      });
      
      
    }

    // header 애니메이션
    //스크롤 내리면 header사라지고, 스크롤 올리면 header 나타남
    function minimize_header() {
      //윈도우 객체를 $window변수에 저장
      let $window = $(window);
      //header 객체를 $header변수에 저장
      let $header = $("header");
      //dis_scroll변수를 선언하고 null(값 없음)으로 초기화
      let did_scroll = null;
      //현재 스크롤 이동값을 저장하는 변수를 선언하고 0으로 초기화
      let current_scroll = 0;
      //마지막 스크롤 이동값을 저장하는 변수를 선언하고 0으로 초기화
      let last_scroll = 0;
      //스크롤 이동값을 저장하는 변수를 선언하고 10으로 초기화
      let move_scroll = 10;
      //윈도우 객체에 스크롤 이벤트 설정
      $window.on("scroll", function () {
        //스크롤이벤트가 발생했으므로 did_scroll변수의 값을 true로 변경
        did_scroll = true;
        //만약 윈도우의 스크롤탑값이 header의 높이보다 크면
        if ($window.scrollTop() > $header.height()) {
          console.log($window.scrollTop());

          //header에 minimize클래스 추가
          $header.addClass("minimize");
          //그렇지 않으면
        } else {
          //header에서 minimize클래스 제거
          $header.removeClass("minimize");
        }
      });
      //만약 스크롤 이벤트가 발생했고(did_scroll=true)
      //body객체가 open-menu클래스를 가지고 있지 않다면
      //has_scrolled함수 호출하고, did_scroll값을 false로 변경
      setInterval(function () {
        if (did_scroll && !$("body").hasClass("open-menu")) {
          has_scrolled();
          did_scroll = false;
        }
      }, 50);

      //has_scrolled함수 선언
      function has_scrolled() {
        //윈도우의 스크롤탑 값을 current_scroll변수에 저장
        current_scroll = $(this).scrollTop();
        console.log(current_scroll);
        //만약 마지막 스크롤이동값에서 현재 스크롤이동값을 뺀 양수값이 move_scroll값보다 작으면 함수 빠져나감(return)
        if (Math.abs(last_scroll - current_scroll) <= move_scroll) return;
        //만약 현재 스크롤이동값이 마지막 스크롤이동값보다 크면(스크롤을 아래로 이동하면)
        if (current_scroll > last_scroll) {
          //현재 스크롤이동값이 10 보다 크면 header 사라짐
          if (current_scroll > 10) {
            gsap.to($header, 0.4, {
              autoAlpha: 0,
              y: -$header.outerHeight(),
              ease: Power3.easeOut,
            });
          }
          //스크롤을 위로 이동하면 header 나타남
        } else {
          gsap.to($header, 0.4, { autoAlpha: 1, y: 0, ease: Power3.easeOut });
        }
        //현재 스크롤 이동값을 last_scroll변수에 저장
        last_scroll = current_scroll;
      }
    }
    //함수 호출
    minimize_header();



    // 메인 슬라이드(클래스 이름이 swiper인 객체)
    const swiper = new Swiper('.main', {
        // 3초마다 자동실행
        autoplay:{
            delay:5000,
            disableOnInteraction: false,
        },
        // 1,2,3,1,2,3...무한루프
        loop: true,
        // 페이지네이션(동그란버튼)
        pagination: {
          el: '.main .swiper-pagination',
        }
      });
      const swiper2 = new Swiper('.notice', {
        // 슬라이드 보이는 가짓수
        slidesPerView:1.3,
        spaceBetween:20,
        // 3초마다 자동실행
        autoplay:{
            delay:5000,
            disableOnInteraction: false,
        },
        // 1,2,3,1,2,3...무한루프
        loop: true,
        // 페이지네이션(동그란버튼)
        pagination: {
          el: '.notice .swiper-pagination',
          type: 'progressbar'
        },
        // prev, next버튼
        navigation: {
          nextEl: ".sec3 .swiper-button-next",
          prevEl: ".sec3 .swiper-button-prev",
        },
        //반응형 breakpoints
        breakpoints:{
          421:{
            slidesPerView:1.5,
            spaceBetween:20
          },
          768:{
            slidesPerView:1.5,
            spaceBetween:20
          },
          1280:{
            slidesPerView:2,
            spaceBetween:20
          },
          1400:{
            slidesPerView:2,
            spaceBetween:20
          }
        }
      });
      const swiper3 = new Swiper('.news', {
        // 슬라이드 보이는 가짓수
        slidesPerView:1.3,
        spaceBetween:20,
        // 3초마다 자동실행
        autoplay:{
            delay:5000,
            disableOnInteraction: false,
        },
        // 1,2,3,1,2,3...무한루프
        loop: true,
        // 페이지네이션(동그란버튼)
        pagination: {
          el: '.news .swiper-pagination',
          type: 'progressbar'
        },
        // prev, next버튼
        navigation: {
          nextEl: ".sec4 .swiper-button-next",
          prevEl: ".sec4 .swiper-button-prev",
        },
        //반응형 breakpoints
        breakpoints:{
          421:{
            slidesPerView:1.5,
            spaceBetween:20
          },
          768:{
            slidesPerView:1.5,
            spaceBetween:20
          },
          1280:{
            slidesPerView:2,
            spaceBetween:20
          },
          1400:{
            slidesPerView:2,
            spaceBetween:20
          }
        }
      });


      //스크롤 내릴 때마다 section안의 자식 콘텐츠들이 서서히 나타나는 애니메이션
      $(window).scroll(function(){
        //윈도우의 scrollTop값을 winTio변수에 저장
        let winTop=$(this).scrollTop();
        // .scrollSet 영역 개수만큼 반복하는 매서드(each())
        $('.scrollSet').each(function(){
          // $(this) : .scrollSet(인덱스 0~4)
          // offset().top :section의 top값
          let secTop=$(this).offset().top-150;
          // section의 bottom값
          let secBottom=secTop+$(this).height();
          // 만약 secTop이 winTop보다 작고, secBottom이 winTop보다 크면 section안의 자식객체에 active추가
          if(secTop < winTop && secBottom > winTop){
            $(this).find('.ani').addClass('active');
          }; //else{
          //   $(this).find('.ani').removeClass('active');
          // } //아래에서 위로 올릴때마다 다시 애니메이션 실행
        });
        
      });

      //family_site
      let sw=0; 
      $('.family_site > a').click(function(e){
        e.preventDefault(); //a태그의 링크 기능을 막는 기능
        //만약 sw변수의 값이 0이면 .family_list 나타나고, sw변수의 값을 1로 변경
        if(sw==0){
          sw=1;
          $('.family_list').slideDown();
          $('.family_site > a').addClass('active');
        //sw변수의 값이 0이 아니면 .family_list 들어가고, sw변수의 값을 0으로 변경
        }else{
          sw=0;
          $('.family_list').slideUp();
          $('.family_site > a').removeClass('active');
        };
      });
      
      //top버튼
      $('.top').click(function(){
        $('html, body').animate({scrollTop:0});
      });
      
});