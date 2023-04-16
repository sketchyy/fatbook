import DishList from "@/shared/components/dish/DishList";
import PageTitle from "@/shared/components/PageTitle";
import SearchBar from "@/shared/components/ui/SearchBar";
import { Fragment } from "react";
import { Form, useLoaderData, useNavigate, useSubmit } from "react-router-dom";

function DishesPage(props) {
  const { searchResult, q } = useLoaderData() as any;
  const submit = useSubmit();
  const navigate = useNavigate();

  const handleDishClick = (dish) => {
    navigate(`/dishes/${dish.id}`);
  };

  return (
    <Fragment>
      <div className="box">
        <PageTitle title="My Dishes" subtitle="Recently used">
          <Form method="post">
            <button className="button is-success">New</button>
          </Form>
        </PageTitle>

        <SearchBar
          defaultValue={q}
          onChange={(event) => {
            submit(event.target.form);
          }}
        />

        <DishList dishes={searchResult} onDishClick={handleDishClick} />
      </div>
    </Fragment>
  );
}

export default DishesPage;
