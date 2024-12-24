document.addEventListener('DOMContentLoaded', function() {
  const body = document.querySelector('body');
  console.log("working");
  body.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('modelOpener')) {
      console.clear();
      console.log("Yes");
      const swatch = event.target;
      const productCard = swatch.closest('.productImages');
      if (productCard) {
        let productTitle = swatch.getAttribute('data-handle');
        let productUrl = `${window.location.origin}/products/${productTitle}.js`;
        console.log(productUrl, 'swatchProduct');
        // Fetch product data
        fetch(productUrl)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
          })
          .then(data => {
            var modalWrapper = document.querySelector('.modalWrapper');
            var variantsColorDiv = modalWrapper.querySelector('.colorsVairant');
            var sizeVariants = modalWrapper.querySelector('.variantSzir');
            variantsColorDiv.innerHTML = '';
            sizeVariants.innerHTML = '';
            modalWrapper.classList.add('active');
            var h4 = modalWrapper.querySelector('h4');
            var image = modalWrapper.querySelector('.imageSrc'); 
            console.log(data.featured_image);
            image.src = data.featured_image;
            h4.textContent = data.title;
            var priceSpan = modalWrapper.querySelector('.productContent span');
            var formattedPrice = (data.price / 100).toFixed(2);
            priceSpan.textContent = formattedPrice;
            var descriptionP = modalWrapper.querySelector('.productContent p');
            descriptionP.textContent = data.description;
            
            data.options[0].values.forEach(function(value) {
                var span = document.createElement('span');
                span.textContent = value;
              span.style.setProperty('--variant-color', value);
                variantsColorDiv.appendChild(span);
            });
            
            var select = document.createElement('select');
            data.options[1].values.forEach(function(value) {
                var option = document.createElement('option');
                option.textContent = value;
                select.appendChild(option);
            });
            sizeVariants.appendChild(select);
            console.log(data);
          })
          .catch(error => {
            console.log('There was a problem with the fetch operation:', error);
          });
      }
    }
    if(event.target && event.target.classList.contains('closeModal')) {
      var modalWrapper = document.querySelector('.modalWrapper');
      modalWrapper.classList.remove('active');
    }
  });
});


document.addEventListener('DOMContentLoaded', function() {
    const menuOpener = document.querySelector('.menuOpener');
    const header = document.querySelector('header');

    if (menuOpener && header) {
        menuOpener.addEventListener('click', function(e) {
            e.preventDefault();
            header.classList.toggle('active');
        });
    }
});

document.querySelector('.colorsVairant').addEventListener('click', function(e) {
    if (e.target && e.target.tagName === 'SPAN') {
        e.preventDefault();
        
        // Remove 'active' class from all span elements
        document.querySelectorAll('.colorsVairant span').forEach(function(span) {
            span.classList.remove('active');
        });
        
        // Add 'active' class to the clicked span
        e.target.classList.add('active');
    }
});