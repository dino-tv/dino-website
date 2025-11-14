
// 단순 이미지 슬라이더 (자동 재생 + 점 클릭)
document.addEventListener('DOMContentLoaded', function() {
  const sliders = document.querySelectorAll('.slider');
  sliders.forEach(function(slider) {
    const slides = slider.querySelectorAll('.slides img');
    if (!slides.length) return;
    const dotsContainer = slider.querySelector('.slider-dots');
    const intervalMs = parseInt(slider.dataset.interval || '2000', 10);

    let current = 0;

    // 점 생성
    if (dotsContainer) {
      slides.forEach(function(_, idx) {
        const dot = document.createElement('div');
        dot.className = 'slider-dot' + (idx === 0 ? ' active' : '');
        dot.addEventListener('click', function() {
          show(idx, false);
        });
        dotsContainer.appendChild(dot);
      });
    }

    const dots = dotsContainer ? dotsContainer.querySelectorAll('.slider-dot') : [];

    function show(idx, auto) {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = idx;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
      if (!auto) {
        // 수동으로 클릭했을 때도 다음 자동 재생은 계속 진행
      }
    }

    slides[0].classList.add('active');

    if (slides.length > 1) {
      setInterval(function() {
        const next = (current + 1) % slides.length;
        show(next, true);
      }, intervalMs);
    }
  });
});

// 실시간 견적 요청 폼(Formspree 연동)
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('quoteForm');
  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        alert('견적 요청이 접수되었습니다. 빠르게 연락드리겠습니다!');
        form.reset();
      } else {
        alert('전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    } catch (err) {
      alert('네트워크 오류가 발생했습니다. 다시 한 번 시도해주세요.');
    }
  });
});
