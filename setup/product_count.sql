--product items count
drop function product_items_count;
create function product_items_count (_search text) returns table(
  count bigint
) language plpgsql as $$
begin
  if _search is not null then
    return query
      select
        count(*) as count
      from
        products as p
      left join
        product_items as pi on p.id = pi.product_id
      where
        (p.name ilike '%' || _search || '%' or p.barcode ilike '%' || _search || '%')
        and (p.is_delete = false and pi.is_delete = false)
      group by
        p.id;
  else
    return query
      select
        count(*) as count
      from
        products as p
      left join
        product_items as pi on pi.product_id = p.id
      where
        (p.is_delete = false and pi.is_delete = false)
      group by
        p.id;
  end if;
end;
$$;

-------------------------------------
--product count
drop function products_count;
create function products_count(_search text) returns integer language plpgsql as $$
begin
  return(
    select
      count(*) as count
    from
      product_items_count(_search)
  );
end;
$$;



