export default function About() {
  return (
    <footer
      className="footer p-5"
      style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
    >
      <p className="block">
        <strong>Fatbook</strong> by{" "}
        <a href="https://github.com/sketchyy" title="github" target="_blank">
          sketchyy
        </a>
      </p>
      <p className="mb-2">Following art assets are used in this app:</p>

      <ul>
        <li>
          <a
            href="https://www.flaticon.com/free-icons/plate"
            title="plate icons"
            target="_blank"
          >
            Plate icons created by Freepik - Flaticon
          </a>
        </li>
        <li>
          <a
            href="https://www.flaticon.com/free-icons/food"
            title="food icons"
            target="_blank"
          >
            Food icons created by Freepik - Flaticon
          </a>
        </li>
      </ul>
    </footer>
  );
}
