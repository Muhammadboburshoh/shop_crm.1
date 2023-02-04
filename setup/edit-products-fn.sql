--add new and detalis product
drop function add_product;
create function add_product(
  _name text,
  _barcode text,
  _count int,
  _original_price text,
  _sale_price text,
  _des text,
  _user_id int
) returns int language plpgsql as $$ declare p_last_id int;
begin
  insert into
    products(name, barcode, description, sale_price, user_id)
  values
    (_name, _barcode, _des, _sale_price, _user_id) returning id into p_last_id;

    if p_last_id > 0 then
      insert into
        product_items(product_id, count, original_price)
      values
      (
        p_last_id,
        _count,
        _original_price
      );
      return 1;
    else
      return 0;
    end if;
end;
$$;

--update product and detalis
drop function update_product;
create function update_product(
  _p_id int,
  _pi_id int,
  _name text,
  _barcode text,
  _count int,
  _original_price text,
  _sale_price text,
  _des text,
  _user_id int
) returns int language plpgsql as $$
declare
  _p_last_id int;
  _pi_last_id int;
begin
    update products
    set
      name = _name,
      barcode = _barcode,
      description = _des,
      sale_price = _sale_price,
      user_id = _user_id
    where
      id = _p_id
    returning id into _p_last_id;

    if _pi_id = 0 then
      insert into
          product_items(product_id, count, original_price)
        values
        (
          _p_last_id,
          _count,
          _original_price
        ) returning id into _pi_last_id;
    else
      update product_items
      set
        count = _count,
        original_price = _original_price
      where
        id = _pi_id 
      returning id into _pi_last_id;
    end if;

    if _p_last_id > 0 and _pi_last_id > 0 then
      return 1;
    else
      return 0;
    end if;
end;
$$;

--delete product and product items
drop function delete_product;
create function delete_product(_p_id int, _pi_id int) returns int language plpgsql as $$
begin
  if _p_id = 0 then
    update product_items
    set
      is_delete = true
    where
      id = _pi_id;

    return 2;
  elsif _pi_id = 0 then
    update products
    set
      is_delete = true
    where
      id = _p_id;

    return 1;
  end if;
end;
$$;