
function addProduct(){
    var data = $('#addProductFrm').serialize();
    console.log(data);
}
// function submitForm(e) {
//   debugger;
//   const name = document.getElementById("productname");
//   const files = document.getElementById("files");
//   // const formData = new FormData();
//   // formData.append("name", name.value);
//   // for (let i = 0; i < files.files.length; i++) {
//   //   formData.append("files", files.files[i]);
//   // }
//   // fetch("/product/addproduct", {
//   //     method: 'POST',
//   //     body: formData,
//   //     headers: {
//   //       "Content-Type": "multipart/form-data"
//   //     }
//   // })
//   //     .then((res) => console.log(res))
//   //     .catch((err) => ("Error occured", err));
//   // $.ajax({
//   //   url: "/product/addproduct", 
//   //   method: "post",
//   //   data:formData,
//   //   contentType : "multipart/form-data",
//   //   success: function(result) {
//   //               alert(result);
//   //             },
//   //             error: function(result) {
//   //               alert(result);
//   //             }
//   //           });
//   var data = $('#frmAddProduct').serialize();
//   console.log(data);
//   $.post("/product/addproduct", data);
// }