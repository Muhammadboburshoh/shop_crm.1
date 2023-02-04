drop function first_stage_orders;
create function first_stage_orders(_u_id int) returns table(
  id int,
  name text,
  status smallint,
  user_id int,
  oi_id int [],
  count int,
  price varchar,
  total_price varchar
) language plpgsql as $$
begin
  return query
    select
      o.id as id,
      p.name as name,
      o.status as status,
      o.user_id as user_id,
      array_agg(oi.id) as oi_id,
      sum(oi.count)::int as count,
      oi.price as price,
      sum(oi.total_price::bigint)::varchar as total_price
    from
      orders as o
    join
      order_items as oi on oi.order_id = o.id
    join
      products as p on oi.product_id = p.id
    join
      product_items as pi on pi.id = oi.pi_id
    where
      o.status = 0 and o.user_id = _u_id
    group by
      o.user_id,
      o.id,
      o.status,
      oi.price,
      p.name
    order by
      array_agg(oi.id);
end;
$$;
