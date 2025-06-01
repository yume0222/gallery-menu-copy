// ハンバーガーメニュー
const nav = document.querySelector('.main-nav');
const links = document.querySelectorAll('.main-nav__link');
const btn = document.querySelector('.hamburger');
const hamburger = () => {
  btn.classList.toggle('open');
  if (btn.classList.contains('open')) {
    nav.classList.add('open');
  } else {
    nav.classList.remove('open');
  }
};
btn.addEventListener('click', hamburger);
links.forEach((link) => {
  link.addEventListener('click', hamburger);
});

// フェードイン
// 監視対象が範囲内に現れたら実行する動作
const animateFade = (entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate(
        {
          opacity: [0, 1],
          translate: ['0 50%', 0]
        },
        {
          duration: 2000,
          easing: 'ease',
          fill: 'forwards',
        }
      );
      obs.unobserve(entry.target);
    }
  });
};
// 監視ロボットの設定
const fadeObserve = new IntersectionObserver(animateFade);
// 監視するように指示
const fadeElements = document.querySelectorAll('.fadein');
fadeElements.forEach((fadeElement) => {
  fadeObserve.observe(fadeElement);
});

// スクロールイベント
window.addEventListener('scroll', () => {
  // スクロール位置
  let scroll = window.scrollY;

  // Mainvisualの拡大縮小
  mv_scale(scroll);

  // Headerの表示
  const logo = document.querySelector('.logo');
  const hamburger = document.querySelector('.hamburger');
  if (scroll > 520) {
    logo.style.transition = '.5s ease';
    logo.style.display = 'block';
    hamburger.style.transition = '.5s ease';
    hamburger.style.display = 'block';
  } else {
    logo.style.transition = '.5s ease';
    logo.style.display = 'none';
    hamburger.style.transition = '.5s ease';
    hamburger.style.display = 'none';
  }

  // サイドボタンの表示
  const sideBtn = document.querySelector('#side-btn');
  // ウィンドウの高さ
  const windowHeight = window.innerHeight;
  // #galleryが画面の下端に現れるスクロール位置 = ページ最上部から#galleryの上端までの距離（ビューポート上端から #gallery の上端まで + スクロール量） - ウィンドウの高さ
  const gallery = document.querySelector('#gallery');
  const galleryTop = gallery.getBoundingClientRect().top + window.scrollY;
  const gallery_position = galleryTop - windowHeight;
  // #accessが画面の下端に現れるスクロール位置
  const access = document.querySelector('#access');
  const accessTop = access.getBoundingClientRect().top + window.scrollY;
  const access_position = accessTop - windowHeight;
  if (innerWidth > 900) {
    // #galleryが表示された場合
    if (scroll > gallery_position) {
      // #accessが表示されるまでの間
      if (scroll < access_position) {
        sideBtn.style.transform = 'rotate(-90deg) translateY(0)';
      // #accessが表示されたら
      } else {
        sideBtn.style.transform = 'rotate(-90deg) translateY(60px)';
      }
    // #galleryが表示される前の場合
    } else {
      sideBtn.style.transform = 'rotate(-90deg) translateY(60px)';
    }
  }

  // Accessの背景画像の表示
  const bg = document.querySelector('.bg');
  // #contactが画面の下端に現れるスクロール位置
  const contact = document.querySelector('#contact');
  const contactTop = contact.getBoundingClientRect().top + window.scrollY;
  const contact_position = contactTop - windowHeight;
  // #accessが表示された場合
  if (scroll > access_position) {
    // #contactが表示されるまでの間
    if (scroll < contact_position) {
      bg.style.transition = '.5s ease';
      bg.style.display = 'block';
    // #contactが表示されたら
    } else {
      bg.style.transition = '.5s ease';
      bg.style.display = 'none';
    }
  // #accessが表示される前の場合
  } else {
    bg.style.transition = '.5s ease';
    bg.style.display = 'none';
  }

  // Mainvisualの拡大縮小
  const handleScrollResize = () => {
    let scroll = window.scrollY;
    mv_scale(scroll);
  };
  // 画面読み込み時
  window.addEventListener('load', handleScrollResize);
  // 画面幅変更時
  window.addEventListener('resize', handleScrollResize);
});

// Mainvisualの拡大縮小
const mv_scale = (scroll) => {
  // ウィンドウの幅
  const innerWidth = window.innerWidth;
  const mainVisualImgs = document.querySelectorAll('#mainvisual img');
  mainVisualImgs.forEach((mainVisualImg) => {
    if (innerWidth > 900) {
      // 拡大（widthの値をスクロール量にあわせて増やす）
      mainVisualImg.style.width = (100 / 3 + scroll / 10) + '%';
    } else {
      // 縮小（widthの値をスクロール量にあわせて減らす）
      mainVisualImg.style.width = (100 - scroll / 10) + '%';
    }
  });
};
