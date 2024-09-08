export default function About() {
  return (
    <footer
      className="footer p-5 has-text-centered"
      style={{ position: "absolute", bottom: 0, width: "100%" }}
    >
      <p className="block">
        <strong>Fatbook</strong> by{" "}
        <a href="https://github.com/sketchyy" title="github" target="_blank" rel="noreferrer">
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
            rel="noreferrer"
          >
            Plate icons created by Freepik - Flaticon
          </a>
        </li>
        <li>
          <a
            href="https://www.flaticon.com/free-icons/food"
            title="food icons"
            target="_blank"
            rel="noreferrer"
          >
            Food icons created by Freepik - Flaticon
          </a>
        </li>
      </ul>
    </footer>
  );
}
