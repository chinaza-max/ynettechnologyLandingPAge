$(document).ready(function() {
   $('#menu').click(function() {
        $('.navContent2').slideToggle(); 
    });

          


          /**START FIRST SPIN */

      const CLASS = {
          ROOT: "c-orbit",
          BARYCENTER: "c-orbit__barycenter",
          PATHS: "c-orbit__paths",
          PATH: "c-orbit__path",
          OBJECTS: "c-orbit__objects",
          OBJECT: "c-orbit__object",
          PLANET: {
          ROOT: "c-planet",
          HIGHLIGHT: "c-planet--highlight",
          AVATAR: "c-planet__avatar"
          }
      };

      const RESOURCE = {
      AVATAR: {
        TEMPLATE:
        "data:image/svg+xml,%3Csvg width='112' height='128' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs/%3E%3Cpath d='M71.1 74.3v-7c5.8.6 9.7-2.3 10.8-3.8 2.9-4 3.2-7.7 3.7-13.2.8-5 0-18.3-.5-24.3l-.5-.8-26.8 1.3-7.2 5.2h-12l1 13 3.2 6V75.2c0 2.4-2.4 4.6-3.8 5.5 1 2.3 5.9 7 18.3 7 15.6 0 15.3-6.8 15-7-1.2-2.3-1-4.8-1.2-6.3z' fill='%23fff' stroke='%23212121'/%3E%3Cpath d='M39.5 77c-1.8 0-3.3 4.2-3.3 6.2-4.6 2-14.3 4.2-21.7 8.1a21.7 21.7 0 00-10.7 14.2l-.5 1.8-2.8 22.9h109.7l-4-25.8c-.8-4.4-3.4-7.7-7.8-10.8a257.4 257.4 0 00-24.7-10.4l-.3-2.5c0-2.7-2.6-3.6-3.3-3.6H39.5z' fill='%23==tShirtColor=='/%3E%3Cpath d='M40.4 50.3c1.2 2.4 1.5 4.8 1.5 5.7.5 0 1.9-.4 3.5-2s1.6-3.2 1.5-3.7c0-.4-.3-1-1.5-1s-2.7-1.7-3.3-2.5c-.7-.9-2.3-3.3-2.7-6-.4-2.9 1-5.4 1.7-6.3 1-1.5 3.8-2.8 5.8-.5 1.6 1.8 3.7 4.3 4.7 5 .7.5 2.7.8 3.5-1 1-2.3-.5-5-.5-6.3 0-1 1.4-1.9 2-2.2H71c8.4 0 20.1-2 20.6-12.3.2-4.8-2.3-7.4-3.6-8-1-.6-3.4-1.8-5.2-1.8-1.8 0-3.8.7-4.5 1 0-.8-.5-1.8-.8-2.2-.9-1.6-4.6-4.8-12-4.8s-10 2.9-10.3 4.3c-1-.8-2.6-1.7-3.2-2-2.2-.6-7.8-1-12.8 2-5 3-5.6 7.6-5.3 9.5-.5.2-1.8.7-3 1.5-1.5 1-2 5-1.7 6.5.2 1.5.5 2 1.7 3.8 1 1.4 2.8 2.2 3.5 2.5-.1.1-.2 1.2 0 3.5.5 3 4.6 14.3 6 17.3z' fill='%23000' stroke='%23000'/%3E%3Cpath d='M71 67.3h0v0c0-.8 0-1.3-1.4-2.3-4.5-3-4.7 1.1-2 1.8 2 .5 2.2.5 3.5.5zM41 75.8c-1.8 0-2.2 4-2.2 6-4.4 2-15 7-22.3 10.8-7.2 3.8-9.2 9-9.3 11l-.5 1.8L4 127.7l53.6 3.7 53.3-3.7c-1-6.9-3.4-21.4-4-24.8-.7-4.3-5-7.3-9.2-10.3-3.5-2.4-22.3-10.8-22.3-10.8l-.3-2.5c0-2.6-1.3-3.4-2-3.5h-32z' stroke='%23000'/%3E%3C/svg%3E",
        CUSTOM: {
        COLOR: /==tShirtColor==/gi
        }
      }
      };

      class Orbit {
      constructor(dom) {
        this.$container = dom;
        this.$paths = this.$container.querySelector("." + CLASS.PATHS);
        this.$barycenter = this.$container.querySelector("." + CLASS.BARYCENTER);
        this.paths = {};
        this.objects = [];
        this.states = {};
        this.start = 0;
        this.currState = 0;
      }

      init() {}

      registerPaths(pathsConfig) {
        if (typeof pathsConfig != "object" && !pathsConfig.length) return;

        pathsConfig.map((path) => {
        const $path = document.createElement("li");
        $path.classList.add(CLASS.PATH);

        this.paths[path.id] = {
          el: $path,
          config: {
          diameter: path.diameter,
          delay: path.delay
          }
        };
        });
      }

      renderPaths() {
        this.$paths.innerHTML = "";

        Object.entries(this.paths).map((entry) => {
        let key = entry[0],
          value = entry[1];

        value.el.classList.add(CLASS.PATH + "--" + key);
        value.el.style.setProperty("--diameter", value.config.diameter);
        value.el.style.setProperty("--delay", value.config.delay);

        this.$paths.appendChild(value.el);
        });
      }

      registerStates(statesConfig) {
        if (typeof statesConfig != "object" && !statesConfig.length) return;

        this.states = [];

        statesConfig.map((state) => {
        this.states.push({
          id: state.id,
          el: this.$barycenter,
          config: {
          styles: {
            background: state.styles.background,
            foreground: state.styles.foreground,
            avatar: RESOURCE.AVATAR.TEMPLATE.replace(
            RESOURCE.AVATAR.CUSTOM.COLOR,
            state.styles.avatar.replace("#", "")
            )
          },
          message: state.message
          }
        });
        });
      }

      setState(state) {
        state.el.style.setProperty("--foreground", state.config.styles.foreground);
        state.el.style.setProperty("--background", state.config.styles.background);
        state.el.style.setProperty(
        "--avatar",
        'url("' + state.config.styles.avatar + '")'
        );
        state.el.innerText = state.config.message;

        this.renderHighlights();
      }

      getIdCurrentState() {
        return this.states[this.currState].id;
      }

      renderHighlights() {
        const currState = this.getIdCurrentState();
        this.objects.map((object) => {
        object.planet.classList.remove(CLASS.PLANET.HIGHLIGHT);

        if (object.config.states.some((state) => state == currState))
          object.planet.classList.add(CLASS.PLANET.HIGHLIGHT);
        });
      }

      runStates(timestamp, that) {
        if (!that.start) {
        that.setState(that.states[that.currState]);
        that.start = timestamp;
        }

        const elapsed = timestamp - that.start;

        if (elapsed > 5000) {
        that.setState(that.states[that.currState]);
        that.currState =
          that.currState + 1 >= that.states.length ? 0 : that.currState + 1;
        this.start = timestamp;
        }

        window.requestAnimationFrame((timestamp) => that.runStates(timestamp, that));
      }

      registerObjects(objectsConfig) {
        if (typeof objectsConfig != "object") return;

        Object.entries(this.paths).map((entry) => {
        let key = entry[0],
          value = entry[1];

        if (!objectsConfig[key].length) return;

        this.paths[key].objects = [];

        objectsConfig[key].map((object, i) => {
          this.paths[key].objects.push({
          src: object.src,
          angle: (1 / objectsConfig[key].length) * i,
          states: object.states
          });
        });
        });
      }

      renderObjects() {
        Object.entries(this.paths).map((entry) => {
        this.renderObjectsByPath(this.paths[entry[0]]);
        });
      }

      renderObjectsByPath(path) {
        path.el.innerHTML = "";

        let $objects = document.createElement("ul");

        $objects.classList.add(CLASS.OBJECTS);

        path.objects.map((object) => {
        let $object = document.createElement("li"),
          $planet = document.createElement("div"),
          $avatar = document.createElement("img");

        $object.classList.add(CLASS.OBJECT);
        $planet.classList.add(CLASS.PLANET.ROOT);
        $avatar.classList.add(CLASS.PLANET.AVATAR);

        $object.style.setProperty("--angle", object.angle + "turn");
        $avatar.src = object.src;

        this.objects.push({
          el: $object,
          planet: $planet,
          config: object
        });

        $planet.appendChild($avatar);
        $object.appendChild($planet);
        $objects.appendChild($object);
        });

        path.el.appendChild($objects);
      }

      render() {
        this.renderPaths();
        window.requestAnimationFrame((timestamp) => this.runStates(timestamp, this));
        this.renderObjects();
      }

      }

      const $orbit = document.querySelector(".c-orbit");

      let orbit = new Orbit($orbit);

      orbit.registerPaths([

      {  
        id: "md",
        diameter: "180px",
        delay: "50s"  
      }, 
      {
        id: "lg",
        diameter: "310px",
        delay: "80s"
      }
      ]);

      orbit.registerStates([
      {
        id: "aqua",
        styles: {
        background: "#DDFCFD",
        foreground: "#089096",
        avatar: "#089096"
        },
        message: "TECHNOLOGY"
      },
      {
        id: "pink",
        styles: {
        background: "#FCE9F2",
        foreground: "#E01F80",
        avatar: "#E01F80"
        },
        message: "TECHNOLOGY"
      },
      {
        id: "yellow",
        styles: {
        background: "#FEF5E7",
        foreground: "#DA8A0C",
        avatar: "#F6B958"
        },
        message:
        "TECHNOLOGY"
      },
      {
        id: "purple",
        styles: {
        background: "#F4F0FE",
        foreground: "#8255F6",
        avatar: "#8355F6"
        },
        message: "TECHNOLOGY"
      },
      {
        id: "green",
        styles: {
        background: "#E7FEF3",
        foreground: "#08914E",                       
        avatar: "#0BDA76"
        },
        message: "TECHNOLOGY"
      }
      ]);

      orbit.registerObjects(
          {
      sm: [
      
        {
          src: "/assets/images/SMSKIT",
          states: ["pink"]
        }
        
      ],
      md: [
        
        {
        src: "/assets/about/technology.svg",
        states: ["purple"]
        },
        {
          src: "/assets/about/location-global-svgrepo-com.svg",
          states: ["pink"]
        }
        
      ],
      lg: [

        {
        src: "/assets/about/security-2-svgrepo-com.svg",
        states: ["green"]
        },
        {
        src: "/assets/about/web-development-svgrepo-com.svg",
        states: ["yellow"]
        },
        {
          src: "/assets/about/financial-security-svgrepo-com.svg",
          states: ["yellow"]
        }
        
      ]}

      );

      orbit.render();
      /**END FIRST SPIN */










           /**START SECOND SPIN */

           const CLASS2 = {
            ROOT: "c-orbit2",
            BARYCENTER: "c-orbit__barycenter2",
            PATHS: "c-orbit__paths2",
            PATH: "c-orbit__path2",
            OBJECTS: "c-orbit__objects2",
            OBJECT: "c-orbit__object2",
            PLANET: {
            ROOT: "c-planet2",
            HIGHLIGHT: "c-planet--highlight2",
            AVATAR: "c-planet__avatar2"
            }
        };
  
        const RESOURCE2 = {
        AVATAR: {
          TEMPLATE:
          "data:image/svg+xml,%3Csvg width='112' height='128' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs/%3E%3Cpath d='M71.1 74.3v-7c5.8.6 9.7-2.3 10.8-3.8 2.9-4 3.2-7.7 3.7-13.2.8-5 0-18.3-.5-24.3l-.5-.8-26.8 1.3-7.2 5.2h-12l1 13 3.2 6V75.2c0 2.4-2.4 4.6-3.8 5.5 1 2.3 5.9 7 18.3 7 15.6 0 15.3-6.8 15-7-1.2-2.3-1-4.8-1.2-6.3z' fill='%23fff' stroke='%23212121'/%3E%3Cpath d='M39.5 77c-1.8 0-3.3 4.2-3.3 6.2-4.6 2-14.3 4.2-21.7 8.1a21.7 21.7 0 00-10.7 14.2l-.5 1.8-2.8 22.9h109.7l-4-25.8c-.8-4.4-3.4-7.7-7.8-10.8a257.4 257.4 0 00-24.7-10.4l-.3-2.5c0-2.7-2.6-3.6-3.3-3.6H39.5z' fill='%23==tShirtColor=='/%3E%3Cpath d='M40.4 50.3c1.2 2.4 1.5 4.8 1.5 5.7.5 0 1.9-.4 3.5-2s1.6-3.2 1.5-3.7c0-.4-.3-1-1.5-1s-2.7-1.7-3.3-2.5c-.7-.9-2.3-3.3-2.7-6-.4-2.9 1-5.4 1.7-6.3 1-1.5 3.8-2.8 5.8-.5 1.6 1.8 3.7 4.3 4.7 5 .7.5 2.7.8 3.5-1 1-2.3-.5-5-.5-6.3 0-1 1.4-1.9 2-2.2H71c8.4 0 20.1-2 20.6-12.3.2-4.8-2.3-7.4-3.6-8-1-.6-3.4-1.8-5.2-1.8-1.8 0-3.8.7-4.5 1 0-.8-.5-1.8-.8-2.2-.9-1.6-4.6-4.8-12-4.8s-10 2.9-10.3 4.3c-1-.8-2.6-1.7-3.2-2-2.2-.6-7.8-1-12.8 2-5 3-5.6 7.6-5.3 9.5-.5.2-1.8.7-3 1.5-1.5 1-2 5-1.7 6.5.2 1.5.5 2 1.7 3.8 1 1.4 2.8 2.2 3.5 2.5-.1.1-.2 1.2 0 3.5.5 3 4.6 14.3 6 17.3z' fill='%23000' stroke='%23000'/%3E%3Cpath d='M71 67.3h0v0c0-.8 0-1.3-1.4-2.3-4.5-3-4.7 1.1-2 1.8 2 .5 2.2.5 3.5.5zM41 75.8c-1.8 0-2.2 4-2.2 6-4.4 2-15 7-22.3 10.8-7.2 3.8-9.2 9-9.3 11l-.5 1.8L4 127.7l53.6 3.7 53.3-3.7c-1-6.9-3.4-21.4-4-24.8-.7-4.3-5-7.3-9.2-10.3-3.5-2.4-22.3-10.8-22.3-10.8l-.3-2.5c0-2.6-1.3-3.4-2-3.5h-32z' stroke='%23000'/%3E%3C/svg%3E",
          CUSTOM: {
          COLOR: /==tShirtColor==/gi
          }
        }
        };
  
        class Orbit2 {
        constructor(dom) {
          this.$container = dom;
          this.$paths = this.$container.querySelector("." + CLASS2.PATHS);
          this.$barycenter = this.$container.querySelector("." + CLASS2.BARYCENTER);
          this.paths = {};
          this.objects = [];
          this.states = {};
          this.start = 0;
          this.currState = 0;
        }
  
        init() {}
  
        registerPaths(pathsConfig) {
          if (typeof pathsConfig != "object" && !pathsConfig.length) return;
  
          pathsConfig.map((path) => {
          const $path = document.createElement("li");
          $path.classList.add(CLASS2.PATH);
  
          this.paths[path.id] = {
            el: $path,
            config: {
            diameter: path.diameter,
            delay: path.delay
            }
          };
          });
        }
  
        renderPaths() {
          this.$paths.innerHTML = "";
  
          Object.entries(this.paths).map((entry) => {
          let key = entry[0],
            value = entry[1];
  
          value.el.classList.add(CLASS2.PATH + "--" + key);
          value.el.style.setProperty("--diameter", value.config.diameter);
          value.el.style.setProperty("--delay", value.config.delay);
  
          this.$paths.appendChild(value.el);
          });
        }
  
        registerStates(statesConfig) {
          if (typeof statesConfig != "object" && !statesConfig.length) return;
  
          this.states = [];
  
          statesConfig.map((state) => {
          this.states.push({
            id: state.id,
            el: this.$barycenter,
            config: {
            styles: {
              background: state.styles.background,
              foreground: state.styles.foreground,
              avatar: RESOURCE2.AVATAR.TEMPLATE.replace(
              RESOURCE2.AVATAR.CUSTOM.COLOR,
              state.styles.avatar.replace("#", "")
              )
            },
            message: state.message
            }
          });
          });
        }
  
        setState(state) {
          state.el.style.setProperty("--foreground", state.config.styles.foreground);
          state.el.style.setProperty("--background", state.config.styles.background);
          state.el.style.setProperty(
          "--avatar",
          'url("' + state.config.styles.avatar + '")'
          );
          state.el.innerText = state.config.message;
  
          this.renderHighlights();
        }
  
        getIdCurrentState() {
          return this.states[this.currState].id;
        }
  
        renderHighlights() {
          const currState = this.getIdCurrentState();
          this.objects.map((object) => {
          object.planet.classList.remove(CLASS2.PLANET.HIGHLIGHT);
  
          if (object.config.states.some((state) => state == currState))
            object.planet.classList.add(CLASS2.PLANET.HIGHLIGHT);
          });
        }
  
        runStates(timestamp, that) {
          if (!that.start) {
          that.setState(that.states[that.currState]);
          that.start = timestamp;
          }
  
          const elapsed = timestamp - that.start;
  
          if (elapsed > 5000) {
          that.setState(that.states[that.currState]);
          that.currState =
            that.currState + 1 >= that.states.length ? 0 : that.currState + 1;
          this.start = timestamp;
          }
  
          window.requestAnimationFrame((timestamp) => that.runStates(timestamp, that));
        }
  
        registerObjects(objectsConfig) {
          if (typeof objectsConfig != "object") return;
  
          Object.entries(this.paths).map((entry) => {
          let key = entry[0],
            value = entry[1];
  
          if (!objectsConfig[key].length) return;
  
          this.paths[key].objects = [];
  
          objectsConfig[key].map((object, i) => {
            this.paths[key].objects.push({
            src: object.src,
            angle: (1 / objectsConfig[key].length) * i,
            states: object.states
            });
          });
          });
        }
  
        renderObjects() {
          Object.entries(this.paths).map((entry) => {
          this.renderObjectsByPath(this.paths[entry[0]]);
          });
        }
  
        renderObjectsByPath(path) {
          path.el.innerHTML = "";
  
          let $objects = document.createElement("ul");
  
          $objects.classList.add(CLASS2.OBJECTS);
  
          path.objects.map((object) => {
          let $object = document.createElement("li"),
            $planet = document.createElement("div"),
            $avatar = document.createElement("img");
  
          $object.classList.add(CLASS2.OBJECT);
          $planet.classList.add(CLASS2.PLANET.ROOT);
          $avatar.classList.add(CLASS2.PLANET.AVATAR);
  
          $object.style.setProperty("--angle", object.angle + "turn");
          $avatar.src = object.src;
  
          this.objects.push({
            el: $object,
            planet: $planet,
            config: object
          });
  
          $planet.appendChild($avatar);
          $object.appendChild($planet);
          $objects.appendChild($object);
          });
  
          path.el.appendChild($objects);
        }
  
        render() {
          this.renderPaths();
          window.requestAnimationFrame((timestamp) => this.runStates(timestamp, this));
          this.renderObjects();
        }
  
        }
  
        const $orbit2 = document.querySelector(".c-orbit2");
  
        let orbit2 = new Orbit2($orbit2);
  
        orbit2.registerPaths([
  
        {  
          id: "md",
          diameter: "180px",
          delay: "45s"  
        }, 
        {
          id: "lg",
          diameter: "310px",
          delay: "80s"
        }
        ]);
  
        orbit2.registerStates([
        {
          id: "aqua",
          styles: {
          background: "#DDFCFD",
          foreground: "#089096",
          avatar: "#089096"
          },
          message: "YNET"
        },
        {
          id: "pink",
          styles: {
          background: "#FCE9F2",
          foreground: "#E01F80",
          avatar: "#E01F80"
          },
          message: "YNET"
        },
        {
          id: "yellow",
          styles: {
          background: "#FEF5E7",
          foreground: "#DA8A0C",
          avatar: "#F6B958"
          },
          message:
          "YNET"
        },
        {
          id: "purple",
          styles: {
          background: "#F4F0FE",
          foreground: "#8255F6",
          avatar: "#8355F6"
          },
          message: "YNET "
        },
        {
          id: "green",
          styles: {
          background: "#E7FEF3",
          foreground: "#08914E",                       
          avatar: "#0BDA76"
          },
          message: "YNET"
        }
        ]);
  
        orbit2.registerObjects(
            {
        sm: [
        
          {
            src: "/assets/images/SMSKIT",
            states: ["pink"]
          }
          
        ],
        md: [
          
          {
          src: "/assets/images/mobileVTU.png",
          states: ["purple"]
          },
          {
            src: "/assets/images/SMSKIT.png",
            states: ["pink"]
          }
          
        ],
        lg: [
  
          {
          src: "/assets/images/Ynet.webp",
          states: ["green"]
          },
          {
          src: "/assets/images/ufitPay.png",
          states: ["yellow"]
          },
          {
            src: "/assets/images/callsavvy.png",
            states: ["yellow"]
          }
          ,
          {
          src: "/assets/images/closeGuard.png",
          states: ["pink"]
          }
        ]}
  
        );
  
        orbit2.render();
        //https://codepen.io/mtsgeneroso/pen/YzGYdVr
        /**END SECOND SPIN */

/*
        setTimeout(() => {
          
        var heading = $('#our-services .desc .heading h1'),
        txt = $('#our-services .desc .text'),
        serviceItem = $('#our-services .services .column .service'),
        tl = new TimelineLite();

        tl
            .from(heading, 0.3, {opacity : 0, y : -20}, '+=0.3')
            .from(txt, 0.3, {opacity : 0, y : -20})
            .staggerFrom(serviceItem, 0.2, {x : -10, autoAlpha : 0}, 0.1);
            
        }, 10000);*/

        function loadSection4(){
               
        var heading = $('#our-services .desc .heading h1'),
        txt = $('#our-services .desc .text'),
        serviceItem = $('#our-services .services .column .service'),
        tl = new TimelineLite();

        tl
            .from(heading, 0.3, {opacity : 0, y : -20}, '+=0.3')
            .from(txt, 0.3, {opacity : 0, y : -20})
            .staggerFrom(serviceItem, 0.2, {x : -10, autoAlpha : 0}, 0.1);
        }
        
        



        const navLinks = document.querySelectorAll('.navContent a, .navContent2 a');
        const menuToggle = document.querySelector('#menu');
        const navContent2 = document.querySelector('.navContent2');
    
        // Function to handle smooth scrolling
        function smoothScroll(targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    
        // Handle click events on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
    
                // Check if it's an internal link (starts with #)
                if (href.startsWith('#')) {
                    e.preventDefault();
                    smoothScroll(href.substring(1));
                } else if (href.includes('#')) {
                    // It's a link to another page with a specific section
                    const [page, section] = href.split('#');
                    if (page === 'index.html' && window.location.pathname.endsWith('index.html')) {
                        e.preventDefault();
                        smoothScroll(section);
                    }
                    // If it's not the index page, let the default behavior happen
                }
                // For external links (like contact.html), let the default behavior happen
            });
        });
    
        // Toggle mobile menu
        if (menuToggle) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent the click from propagating to the document
                navContent2.classList.toggle('show-menu');
            });
    
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!menuToggle.contains(e.target) && navContent2.classList.contains('show-menu')) {
                    navContent2.classList.remove('show-menu');
                }
            });
    
            // Prevent menu from closing when clicking inside navContent2
            navContent2.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    
        // Handle smooth scrolling when coming from another page
        if (window.location.hash) {
            const targetId = window.location.hash.substring(1);
            smoothScroll(targetId);
        }









    
/*
    // Handle click events on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Check if it's an internal link (starts with #)
            if (href.startsWith('#')) {
                e.preventDefault();
                smoothScroll(href.substring(1));
            } else if (href.includes('#')) {
                // It's a link to another page with a specific section
                const [page, section] = href.split('#');
                if (page === 'index.html' && window.location.pathname.endsWith('index.html')) {
                    e.preventDefault();
                    smoothScroll(section);
                }
                // If it's not the index page, let the default behavior happen
            }
            // For external links (like contact.html), let the default behavior happen
        });
    });

    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navContent2.style.display = navContent2.style.display === 'block' ? 'none' : 'block';
        });
    }*/

    // Handle smooth scrolling when coming from another page
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        smoothScroll(targetId);
    }

      

/*
var string = "Welcome to Ynet Group";
var array = string.split("");
var timer;

function frameLooper() {
    if (array.length > 0) {
      document.getElementById("section2Text").innerHTML += array.shift();
      timer = setTimeout(frameLooper, 70); /* Pass function reference here */
   /* } else {
      clearTimeout(timer); // Stop the timer when array is empty
    }
  }
  */
  
  //loadSection4()
  let hasLoadSection4 =1

        //https://codepen.io/Azametzin/pen/mdarMWE
        //https://codepen.io/daniel-mu-oz/pen/NWZqpoW

  $(window).on("scroll", function() {
    var scrollPosition = $(this).scrollTop();

   // console.log(scrollPosition)

   console.log(scrollPosition)
   console.log($(window).width())

    if ($(window).width() > 768) {


    // For desktop, add the 'scrolled' class
    if (scrollPosition > 1888) {

      if(hasLoadSection4){
        loadSection4()
        hasLoadSection4 =0

      }
     

    }
    } else {
    // For mobile, add the 'mobile-scrolled' class
    }
   
  });

});