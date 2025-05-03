CREATE INDEX IF NOT EXISTS advocates_name_idx
  ON advocates (first_name, last_name);

CREATE INDEX IF NOT EXISTS advocates_city_idx
  ON advocates (city);

CREATE INDEX IF NOT EXISTS advocates_degree_idx
  ON advocates (degree);

CREATE INDEX IF NOT EXISTS advocates_experience_idx
  ON advocates (years_of_experience);