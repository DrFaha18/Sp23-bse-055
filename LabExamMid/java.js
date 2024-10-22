
const profilePic = document.querySelector('.profile-pic');
const introduction = document.getElementById('introduction');


profilePic.addEventListener('mouseover', () => {
    introduction.style.display = 'block';
});


profilePic.addEventListener('mouseout', () => {
    introduction.style.display = 'none';
});
