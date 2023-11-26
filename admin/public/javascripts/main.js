function togglePopup(){
	var blur = document.getElementById('blur');
	blur.classList.toggle('active');
	var popup = document.getElementById('popup');
	popup.classList.toggle('active');
}

document.querySelector('.btnSave').addEventListener('click', togglePopup);
document.querySelector('.btn-add').addEventListener('click', togglePopup);