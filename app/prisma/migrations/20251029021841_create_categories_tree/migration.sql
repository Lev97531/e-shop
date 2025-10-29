CREATE VIEW "CategoriesTree" AS
WITH RECURSIVE hierarchy (id, name, parentId, json_path, children_json) AS (
  SELECT
    id,
    name,
    "parentId",
    json_array(id) AS json_path,
    json_array() AS children_json
  FROM
    "Category"
  WHERE
    "parentId" IS NULL
  UNION
  ALL
  SELECT
    c.id,
    c.name,
    c."parentId",
    json_insert(h.json_path, '$[#]', c.id),
    json_array()
  FROM
    "Category" AS c
    JOIN hierarchy AS h ON c."parentId" = h.id
),
tree_builder AS (
  SELECT
    id,
    name,
    (
      SELECT
        json_group_array(
          json_object(
            'id',
            child.id,
            'name',
            child.name,
            'children',
            child.children_json
          )
        )
      FROM
        hierarchy AS child
      WHERE
        child.parentId = parent.id
    ) AS children
  FROM
    hierarchy AS parent
  WHERE
    parent.parentId IS NULL
)
SELECT
  json_group_array(
    json_object(
      'id',
      id,
      'name',
      name,
      'children',
      json(children)
    )
  ) AS json
FROM
  tree_builder;