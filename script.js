//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
let promises =[];

images.forEach(obj => {
	promises.push(
	  new Promise((resolve, reject)=>{
	    let url = obj.url;
  		fetch(url)
  			.then( (response)=>{
  				if(!response.ok){
  					throw new Error(`Failed to load image's URL: ${obj.url}`);
  				} else {
  				  console.log("response",response, resolve(obj.url));
  				  resolve(obj.url);
  				// 	return response.blob()
  				}
  			})
  		// 	.then((blob)=>{
  		// 		const imageUrl = URL.createObjectURL(blob);
  		// 		resolve(imageUrl);
  		// 	})
  			.catch((error)=>{
  				reject(error);
  			});
  	})
	);
});


btn.addEventListener('click', () => {
Promise.all(promises)
	.then((imageUrls)=>{
		imageUrls.forEach(url => {
      const img = document.createElement('img');
      // alert(url);
      img.src = url;
      output.appendChild(img);
    });
	
  })
  .catch((error)=>{
    alert(error);
  });
});