$(function () {
  // https://whatsupguys.net/programming-school-dive-into-code-learning-90/
  // https://lab.syncer.jp/Web/JavaScript/Snippet/26/
  // http://var.blog.jp/archives/62330155.html
  // http://amaraimusi.sakura.ne.jp/note_prg/JavaScript/file_binary.html
  
  function dataURLtoFile(data_url, filename) {
    // バイナリに変換
    var byteString = atob(data_url.split(",")[1]);
    // MIMEタイプ
    var mimeType = data_url.match(/(:)([a-z\/]+)(;)/)[2];
    // バイナリからBlobを作成
    for (var i = 0, l = byteString.length, content = new Uint8Array(l); l > i; i++) {
      content[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([content], {
      type: mimeType,
    });
    blob.lastModifiedDate = new Date();
    blob.name = filename;

    return blob;
  }

  function getRoundedCanvas(sourceCanvas, size=120) {
    var canvas = document.createElement('canvas');
    resizeImage(sourceCanvas, canvas, size);

    var context = canvas.getContext('2d');
    context.imageSmoothingEnabled = true;
    context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) / 2, 0, 2 * Math.PI, true);
    context.fill();
    return canvas;
  }

  function resizeImage(image_or_canvas, canvas, size=240) {
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
    var current_url = location.pathname;
    var target_url_regex = new RegExp("/users/sign_up|/users/edit");
    if (!current_url.match(target_url_regex)) return false;

    var http_method, controller_method;
    if (current_url == "/users/sign_up") {
      http_method = 'POST';
      controller_method = 'new_user';
    }
    if (current_url == "/users/edit") {
      http_method = 'PATCH'
      controller_method = 'edit_user';
    }

    var is_cropper = false;
    var cropper;
    var preview_avatar = $('#preview_avatar');
    var preview_result = $('#preview_result');
    var preview_image = $('<img>').attr("id", "preview_image");


    function createFormData(controller_method) {
      var formData = new FormData();
      if ($('#preview_hidden_trim_avatar').length) {
        var filename = preview_image.attr('title');
        var data_url = $("#preview_hidden_trim_avatar").attr('src');
        if (data_url.match(location.origin)) {
          formData.append('user[avatar]', data_url);
        } else {
          formData.append('user[avatar]', dataURLtoFile(data_url, filename), filename);
        }
      } else {
        formData.append('user[avatar]', '');
      }
      var username = $('#user_name').val();
      var email = $('#user_email').val();
      var password = $('#user_password').val();
      var password_confirm = $('#user_password_confirmation').val();


      formData.append('user[name]', username);
      formData.append('user[email]', email);
      formData.append('user[password]', password);
      formData.append('user[password_confirmation]', password_confirm);
      // if (controller_method === 'edit_user') {
      //   var current_password = $('#user_current_password').val();
      //   formData.append('user[current_password]', current_password);
      // }
      // debugger;

      return formData;
    }

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

      $('#preview_hidden_trim_avatar').remove();
      var hidden_canvas = getRoundedCanvas(croppedCanvas, 60);
      hidden_image = $('<img>').attr({
        src: hidden_canvas.toDataURL(),
        id: 'preview_hidden_trim_avatar',
        // style: 'visibility:hidden'
      });
      preview_result.append(hidden_image[0]);
    }
    //初回表示時
    preview_image[0].addEventListener('ready', function (e) {
      if ($('#preview_trim_title').val() === undefined) {
        preview_result.before($('<div>').text('プレビュー').attr('id', 'preview_trim_title'));
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

    /*
      新規アカウント作成の場合
    */
    $("#new_user").on("change", '#user_avatar', function (e) {

      var file = event.target.files[0];
      if (is_cropper) {
        cropper.destroy();
      }
      // キャンセルボタンを押した時
      if (file === undefined) {
        preview_avatar.empty();
        preview_result.empty();
        $('#preview_trim_title').remove();
        return false;
      }
      // 画像かどうかの判別追加
      var imageType = /image.*/;
      if (!file.type.match(imageType)) {
        preview_avatar.empty();
        preview_result.empty();
        $('#preview_trim_label').remove();
        alert('イメージ画像ではありません。');
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
          // debugger;

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

    /*
      アカウント更新の場合
    */
    $("#edit_user").on("change", '#user_avatar', function (e) {
      $('#preview_hidden_trim_avatar').remove();

      var file = event.target.files[0];
      if (is_cropper) {
        cropper.destroy();
      }
      // キャンセルボタンを押した時
      if (file === undefined) {
        preview_avatar.empty();
        // preview_result.empty();
        $('#preview_trim_title').remove();
        return false;
      }
      // 画像かどうかの判別追加
      var imageType = /image.*/;
      if (!file.type.match(imageType)) {
        preview_avatar.empty();
        preview_result.empty();
        $('#preview_trim_label').remove();
        alert('イメージ画像ではありません。');
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
          // debugger;

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

    // 作成または更新ボタンが押された場合
    $('#user_submit_btn').on('click', function () {
      $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        var token;
        if (!options.crossDomain) {
          token = $('meta[name="csrf-token"]').attr('content');

          if (token) {
            return jqXHR.setRequestHeader('X-CSRF-Token', token);
          };
        };
      });

      var formData = createFormData(controller_method);
      $.ajax({
        url: '/users',
        type: http_method,
        data: formData,
        processData: false,
        contentType: false
      })
      .done(function (data, textStatus, jqXHR) {
        var token, errors;
        var dom = document.createElement("dom");
        $(dom).html(jqXHR.responseText);
        errors = $('#error_explanation', dom);

        if (errors.length) {
          if ($('#error_explanation').length) {
            $('#error_explanation').remove();
          }
          token = $('meta[name="csrf-token"]', dom).attr('content');
          $('meta[name="csrf-token"]').attr('content', token);
          $('input[name="authenticity_token"]').val(token);
          $(`#${controller_method}`).prepend(errors[0]);
        }
      })
      .fail(function () {
        alert('アカウント登録に失敗しました。');
      });

    })

    $('#avatar_box').on('click', "#avatar_delete_btn", function () {
      if (is_cropper) {
        cropper.destroy();
        is_cropper = false;
      }
      $('#preview_hidden_trim_avatar').remove();
      $('#preview_trim_title').remove();
      preview_avatar.empty();
      preview_result.empty();
      $(`#${controller_method}`)[0].reset();
    })
  });

})