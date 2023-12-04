<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
session_start();
// Check if the user is already logged in
if (isset($_SESSION['username'])) {
    // User is already logged in, redirect to cms.html
    header("Location: cms.php");
    exit();
} 
?>
<!DOCTYPE html>
<html>
  <head>
  <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="../CSS/style.css">
    <title>Login Page</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  </head>
  <body>
    <section class="vh-100 gradient-custom"></section>
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-5">
                <img src="../Resources/mmlogo-round.png" alt="loginlogo" />
                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                <form method="POST" action="login_form.php">
                  <div class="form-outline form-white mb-4">
                    <input type="text" id="typeUsername" name="username"
                    class="form-control form-control-lg" />
                    <label class="form-label" for="typeUsername">Username</label>
                  </div>

                  <div class="form-outline form-white mb-4">
                    <input type="password" id="typePasswordX" name="password"
                    class="form-control form-control-lg" />
                    <label class="form-label" for="typePasswordX"
                      >Password</label
                    >
                  </div>
                  <button
                    class="btn btn-outline-light btn-lg px-5"
                    type="submit"
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
