import { useEffect } from "react";
import "./App.css";
import Banner from "./components/Banner";
import Lenis from "@studio-freight/lenis";
import Work from "./components/Work";
import Container from "./components/Container";
import { scrollWorkHandler } from "./components/animations";
import Skills from "./components/Skills";
import About from "./components/About";
import Testimony from "./components/Testimony";
import Contact from "./components/Contact";
import Map from "./components/Map";
import Cursor from "./components/Cursor";
import Content from "./components/Content";
import Test from "./components/Test";

function App() {
  useEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", (e: any) => {});

    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => {};
  }, []);

  return (
    <div className="app">
      {/*       <Content>
        <Test />
      </Content>
      <Banner /> */}
      <Content>
        <Work />
      </Content>
      <Content title="What i do">
        <Skills />
      </Content>
      <Content title="What about me">
        <About />
      </Content>
      <Content title="They talk about me">
        <Testimony />
      </Content>
      {/*       <Content title="Map" >
        <Map />
      </Content> */}
      <Content title="Contact">
        <Contact />
      </Content>
      <Cursor />

      {/*  <Banner />
      <Container animation={scrollWorkHandler} id="container__work">
        <div>
          <Work />
          <BannerImage />
        </div>
      </Container> */}
    </div>
  );
}

export default App;
