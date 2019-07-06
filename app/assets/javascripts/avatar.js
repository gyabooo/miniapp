$(function () {

  function getRoundedCanvas(sourceCanvas) {
    var canvas = document.createElement('canvas');
    resizeImage(sourceCanvas, canvas, 64);

    var context = canvas.getContext('2d');
    context.imageSmoothingEnabled = true;
    context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) / 2, 0, 2 * Math.PI, true);
    context.fill();
    return canvas;
  }


  function resizeImage(image_or_canvas, canvas, size=320) {
    var context = canvas.getContext('2d');
    var dst_witdh, dst_height;
    if (image_or_canvas.width > image_or_canvas.height) {
      dst_witdh = size;
      dst_height = image_or_canvas.height * size / image_or_canvas.width;
    } else {
      dst_height = size;
      dst_witdh = image_or_canvas.width * size / image_or_canvas.height;
    }
    canvas.width = dst_witdh;
    canvas.height = dst_height;
    context.drawImage(image_or_canvas, 0, 0, image_or_canvas.width, image_or_canvas.height, 0, 0, dst_witdh, dst_height);
  }

  $(document).on('turbolinks:load', function (e) {
    var is_cropper = false;
    var cropper;
    var preview_avatar = $('#preview_avatar');
    var preview_result = $('#preview_result');
    var preview_image = $('<img>').attr("id", "preview_image");

    // クロップ処理した画像をプレビュー領域に表示
    function cropping(e) {
      croppedCanvas = cropper.getCroppedCanvas();
      roundedCanvas = getRoundedCanvas(croppedCanvas);
      roundedImage = $('<img>').attr({
        src: roundedCanvas.toDataURL(),
        id: 'preview_trim_avatar'
      });
      preview_result.empty();
      preview_result.append(roundedImage[0]);
    }
    //初回表示時
    preview_image[0].addEventListener('ready', function (e) {
      if ($('#preview_trim_label').val() === undefined) {
        preview_result.before($('<label>').text('プレビュー').attr('id', 'preview_trim_label'));
      }
      cropping(e);
    });
    //画像をドラッグした際の処理
    preview_image[0].addEventListener('cropend', function (e) {
      cropping(e);
    });
    // 画像を拡大・縮小した際の処理
    preview_image[0].addEventListener('zoom', function (e) {
      cropping(e);
    });

    $("#new_user").on("change", '#user_avatar', function (e) {

      var file = event.target.files[0];
      if (is_cropper) {
        cropper.destroy();
      }
      if (file === undefined) {
        preview_avatar.empty();
        preview_result.empty();
        $('#preview_trim_label').remove();
        return false;
      }

      var reader = new FileReader();
      preview_image.attr("title", file.name);
      preview_avatar.empty();
      preview_avatar.append($('<lebal>').text('画像をトリミングしてください'));

      reader.onload = function (e) {
        var canvas = document.createElement('canvas');
        var upload_image = new Image();

        upload_image.onload = function (event) {
          resizeImage(upload_image, canvas);
          $(preview_image).attr('src', canvas.toDataURL());
          preview_avatar.append(preview_image[0]);

          cropper = new Cropper(preview_image[0], {
            aspectRatio: 1,
            viewMode: 1,
            ready: function () {
              is_cropper = true;
            }
          })
        }
        upload_image.src = e.target.result;
      }
      reader.readAsDataURL(file);
    });

  });

})