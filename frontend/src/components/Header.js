import React from 'react'

function Header() {
  return (
    <nav className="navbar navbar-expand-md sticky-top navbar-shrink py-3" id="mainNav">
        <div className="container"><a className="navbar-brand d-flex align-items-center" href="/"><span>InternProject</span></a><button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1"><span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navcol-1">
                <ul className="navbar-nav mx-auto">
                    <li className="nav-item"><a className="nav-link active" href="index.html">Home</a></li>
                    <li className="nav-item"><a className="nav-link" href="services.html">Find Events</a></li>
                    <li className="nav-item"><a className="nav-link" href="projects.html">Create Events</a></li>
                    <li className="nav-item"></li>
                    <li className="nav-item"></li>
                </ul><a className="btn btn-primary shadow" role="button" href="signup.html">Sign in</a><a class="btn btn-primary shadow" role="button" href="signup.html">Sign up</a>
            </div>
        </div>
    </nav>
  )
}

export default Header