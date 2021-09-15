let allproduct;
const product = async () => {
  return fetch(`https://sohail-test-store.myshopify.com/products/apple-iphone-11-pro.json`)
    .then(function (result) {
      return result.json();
    })
    .then(function (final) {
      return final;
    });
};

// Main CAlls
function varaint_images(image) {
  var commanImage = [];
  let vids;
  let variantData = {};
  let onlyselected = {};
  let src;
  let flag = true;
  let img;
  let varaintids = [];
  let all_images = [];
  image.forEach((img) => {
    src = img["src"];
    all_images.push(src);
    if (img["variant_ids"].length == 0 && flag) {
      commanImage.push(img["src"]);
    }
    if (img["variant_ids"].length > 0) {
      vids = img["variant_ids"];

      flag = false;
    }

    if (vids) {
      vids.forEach((id) => {
        if (varaintids.indexOf(id) === -1) {
          varaintids.push(id);
        }

        if (typeof variantData[id] == "undefined") {
          variantData[id] = [src];
        } else {
          variantData[id].push(src);
        }
      });
    }
  });
  [...new Set(varaintids)].forEach((id) => {
    variantData[id].push(...commanImage);
  });
  console.log(variantData);
  // for (i = 0; i < 11; i++) {
  //   for (j = 1; j < 2; j++) {
  //     if(variantData[i]==variantData[j]){

  //     }
  //   }
  // }
  var targetLi = document.querySelectorAll(".product-single__thumbnails-slider-track li");

  console.log(targetLi);

  var changeColor = document.querySelector("#SingleOptionSelector-0");

  changeColor.addEventListener("change", function (e) {
    document.querySelectorAll(".product-single__thumbnails-slider-track li").forEach((e) => e.remove());
    let val = new URL(document.location).searchParams.get("variant");
    var selectedvarient = variantData[val];
    console.log(all_images);
    selectedvarient.forEach((img, index) => {
      for (j = 0; j < all_images.length; j++) {
        if (selectedvarient[index] == all_images[j]) {
          var indexArr = [];
          indexArr = all_images.indexOf(selectedvarient[index]);
          src = all_images[indexArr];
          document.querySelector(".product-single__thumbnails-slider-track").append(targetLi[indexArr]);
        }
      }
    });
  });
  changeColor.dispatchEvent(new Event("change"));
}

const main = async () => {
  let fetchData = await product();
  let image = fetchData.product.images;
  // console.log(image);
  varaint_images(image);
};

main();
