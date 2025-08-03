

const form = document.getElementById('login-form'); 

  form.addEventListener('submit', async (evenementlogin) => { 
    evenementlogin.preventDefault(); 

    const email = document.getElementById('email').value; 
    const password = document.getElementById('password').value; 
 
    // Appel d'API avec methode POST // 
    try { 
      const response = await fetch('http://localhost:5678/api/users/login', { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',  
        },
        body: JSON.stringify({ email, password }), 
      });

      if (!response.ok) {
        throw new Error('Identifiants incorrects');
      }

      const data = await response.json(); 

      // Token localStorage // 
      localStorage.setItem('token', data.token);  
      window.location.href = 'index.html'; 

    } catch (error) {
      alert('Email ou mot de passe incorrect'); 
    }
});