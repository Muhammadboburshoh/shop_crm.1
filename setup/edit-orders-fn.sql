drop function add_order;
create function add_order(_p_id int, _pi_id int, _count int, _u_id int) returns int language plpgsql as $$
declare
  _o_id int := (select id from orders where user_id = _u_id and status = 0);
  _oi_id int := (
    select
        oi.id
      from
        order_items as oi
      join
        orders as o on o.id = oi.order_id
      where
        o.status = 0 and oi.product_id = _p_id and o.id = _o_id and oi.pi_id = _pi_id
  );
  _price varchar := (select sale_price from products where id = _p_id);
  _original_price varchar := (select original_price from product_items where id = _pi_id);
begin
  if _o_id is null then
    insert into orders(user_id) values (_u_id) returning id INTO _o_id;
  end if;

  update product_items
  set 
    count = count - _count
  where
    id = _pi_id;
  if _oi_id > 0 then
    update order_items
    set
      count = count + _count,
      price = _price,
      original_price = _original_price,
      total_price = ((count + _count) * _price::bigint)::varchar,
      original_total_price = ((count + _count) * _original_price::bigint)::varchar
    where
      id = _oi_id;

    return 2;
  else
    insert into order_items(
      product_id, pi_id, count, price, original_price, total_price, original_total_price, order_id
    ) values (
      _p_id,
      _pi_id,
      _count,
      _price,
      _original_price,
      (_price::bigint * _count)::varchar,
      (_original_price::bigint * _count)::varchar,
      _o_id
    );

    return 1;

  end if;
end;
$$;