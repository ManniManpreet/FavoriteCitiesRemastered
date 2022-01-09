gsap.registerPlugin(ScrollTrigger);

const createTextTypingAnimation = (containerElement, inputText, delay) => {
    gsap.to(containerElement, {
        text: inputText,
        duration: 2,
        delay: delay ? 1 : 0
    });
};

const createScrollDownIconAnimation = () => {
    gsap.to(".scrollDownIcon", {
        y: 20,
        duration: 0.7,
        repeat: -1,
        yoyo: true,
        ease: "power1.in"
      });
};

const createTextTypingAnimationOnScrollToContainer = (parentContainer, textEnclosingContainer, inputText) => {
    gsap.to(parentContainer, {
        scrollTrigger: {
            trigger: parentContainer,
            start: "top top",
            pin: true,
            scrub: 4,
            onEnter: () => createTextTypingAnimation(textEnclosingContainer, inputText, false)
        },
        onComplete: () => {
            createCommentAndContactInfoRevealAnimation();              
        }
    });
};

const createCursorBlinkAnimation = () => {
    gsap.to(".cursor, .darkCursor", {
        opacity: 0,
        duration: 0.8,
        repeat: -1,
        repeatDelay: 0.2,
        ease: "easeOut"
    });
};

const createHelloContainerRevealAnimation = (primaryContainer, parentContainer) => {
    gsap.to(primaryContainer, {
        scrollTrigger: {
          trigger: parentContainer,
          start: "top top",
          scrub: 4,
          pin: parentContainer,
          endTrigger: primaryContainer,
          end: "250% top",
          onUpdate: self => {
              if (self.progress >= 0.7) {
                  changeColorOfFixedElementsToWhite();
              }
              else{
                  changeColorOfFixedElementsToBlack();
              }
          }
        },
        height: 0,
      });
};

const changeColorOfFixedElementsToWhite = () => {
    createColorChangeAnimation("#myName", "white");
    createColorChangeAnimation("#linkToMyResume", "white");
};

const changeColorOfFixedElementsToBlack = () => {
    createColorChangeAnimation("#myName", "black");
    createColorChangeAnimation("#linkToMyResume", "black");
};

const createColorChangeAnimation = (element, color) => {
    gsap.to(element, {
        color: color,
        duration: 2
    });
};

const createHorizontalTextTranslationAnimation = (containerElement, parentContainer) => {
    gsap.to(containerElement, {
        scrollTrigger: {
          trigger: parentContainer,
          start: "top top",
          pin: true,
          scrub: 4,
          end: "350% top"
        },
        left: "-350%"
      });
};

const createTimelineForImageTextAppearAnimation = (image, textOnImage) => {
    return gsap.timeline()
    .to(image, {
        "filter": "blur(40px)",
        "-webkit-filter": "blur(40px)",
        duration: 0.3
    })
    .to(textOnImage, {
        top: "0"
    })
    .to(image, {
        opacity: 0
    });
};

const createScrollTriggerForImageTextAppearAnimation = (timeline, currentImage, container, textOnImage) => {
    ScrollTrigger.create({
        animation: timeline,
        scrub: 1,
        pin: currentImage,
        trigger: container,
        start: "top top",
        endTrigger: textOnImage,
        end: "10% top"
    });
};

const createImageTextAppearAnimationForAllImages = () => {
    let containers = document.querySelectorAll("div[id^='imageContainer']");

    containers.forEach(container => {
        let textOnImage = container.querySelector("div[id^='imageText']");
        let image = container.querySelector("img");
        let timeline = createTimelineForImageTextAppearAnimation(image, textOnImage);

        createScrollTriggerForImageTextAppearAnimation(timeline, image, container, textOnImage);
    });
};

const createGraciasContainerRevealAnimation = (primaryContainer, parentContainer) => {
    gsap.to(primaryContainer, {
        scrollTrigger: {
            trigger: parentContainer,
            start: "top top",
            scrub: 4,
            pin: parentContainer,
            endTrigger: primaryContainer,
            end: "bottom top",
            onUpdate: self => {
                if (self.progress >= 0.7) {
                    changeColorOfFixedElementsToBlack();
                }
                else{
                    changeColorOfFixedElementsToWhite();
                }
            }
        },
        height: 0,
      });
};

const createCommentAndContactInfoRevealAnimation = () => {
    const t = gsap.timeline();
    t.to(".funnyComment", {
        transform: "translate(0, 0)",
        duration: 1
    }).to(".contactInfo", {
        delay: 0.5,
        transform: "translate(0, 0)",
        duration: 1
    });
};

const createOnClickActions = () => {
    document.querySelector("#linkToMyResume").onclick = () => {
        window.open('ManpreetManniUpdatedResume.pdf', '_blank', 'fullscreen=yes');
    };
};


createScrollDownIconAnimation();
createCursorBlinkAnimation();
createOnClickActions();
createTextTypingAnimation("#primaryHelloText", "Hello.", true);
createTextTypingAnimation("#secondaryHelloText", "Hello.", true);
createHelloContainerRevealAnimation(".primaryIntroContainer", ".introContainer");
createHorizontalTextTranslationAnimation(".question", ".container2");
createImageTextAppearAnimationForAllImages();
createGraciasContainerRevealAnimation(".primaryOutroContainer", ".outroContainer");
createTextTypingAnimationOnScrollToContainer(".primaryOutroContainer", "#primaryGraciasText", "Gracias.");
createTextTypingAnimationOnScrollToContainer(".primaryOutroContainer", "#secondaryGraciasText", "Gracias.");
