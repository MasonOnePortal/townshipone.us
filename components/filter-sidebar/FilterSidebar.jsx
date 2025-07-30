"use client"
import React, { useCallback, useState } from "react"
import style from "./filter_sidebar.module.css"
import SearchInput from "./SearchInput"
import FilterCheckBox from "./FilterCheckBox"
import { FaRegCircleXmark } from "react-icons/fa6"
import { usePathname, useSearchParams } from "next/navigation"
import { useFilterQuery } from "@/hooks/useFilterQuery"
import { getQueryParamsAsObject } from "@/utils/helperFn"
import { useRouter } from "next/navigation"
import { toggleFilerSidebar } from "@/store/auth/authSlice"
import { useDispatch } from "react-redux"
import Select from "react-select"

export const filterOptions = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
]

const ratingTypes = [
  {
    label: "4 ★ & above",
    value: 4,
  },
  {
    label: "3 ★ & above",
    value: 3,
  },
]

const serviceMode = [
  {
    label: "Online",
    value: "Online",
  },
  {
    label: "Offline",
    value: "Offline",
  },
  {
    label: "Hybrid",
    value: "Hybrid",
  },
]

function FilterSidebar({
  operatingMode = true,
  modeTitle = "Mode of Service",
  userRating = true,
  eCommerceMode = true,
  SearchPlaceHolder = null,
  customFields,
}) {
  const [eCommerceEnabled, setECommerceEnabled] = useState(false)
  const {
    ratingFilter: initialRatingFilter,
    setSelectedServiceModes,
    setRatingFilter,
    isECommerceChecked,
    setIsECommerceChecked,
    selectedServiceModes,
  } = useFilterQuery()

  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const eComMode = searchParams.get("eCommerceMode")
  const [eComStatus, setEComStatus] = useState(eComMode)

  const ratingFilter = Array.isArray(initialRatingFilter) ? initialRatingFilter : []

  const onChangeEcommerce = (event) => {
    const { checked } = event.target
    const paramsdd = new URLSearchParams(searchParams)
    const queryParams = getQueryParamsAsObject(paramsdd)

    // Reset page to 1 when applying filter
    const { page, ...restParams } = queryParams
    const updatedParams = {
      ...restParams,
      eCommerceMode: checked ? "Yes" : "",
      page: "1",
    }

    setECommerceEnabled(event.target.checked)
    const params = new URLSearchParams(updatedParams)
    const queryString = params.toString()
    router.replace(`${pathname}?${queryString}`, { scroll: false })
  }

  const onChangeServiceHandler = (value) => {
    const paramsdd = new URLSearchParams(searchParams)
    const queryParams = getQueryParamsAsObject(paramsdd)

    // Reset page to 1 when applying filter
    const { page, ...restParams } = queryParams
    const updatedParams = {
      ...restParams,
      filterMode: queryParams.filterMode === value ? "" : value,
      page: "1",
    }

    const params = new URLSearchParams(updatedParams)
    const queryString = params.toString()
    router.replace(`${pathname}?${queryString}`, { scroll: false })
  }

  const onChangeHandler = (value) => {
    const paramsdd = new URLSearchParams(searchParams)
    const queryParams = getQueryParamsAsObject(paramsdd)
    const updatedRatingFilter = ratingFilter.includes(value) ? [] : [value]

    // Reset page to 1 when applying filter
    const { page, ...restParams } = queryParams
    const updatedParams = {
      ...restParams,
      filterRating: updatedRatingFilter.length > 0 ? updatedRatingFilter.join(",") : "",
      page: "1",
    }

    setRatingFilter(updatedRatingFilter)
    const params = new URLSearchParams(updatedParams)
    const queryString = params.toString()
    router.replace(`${pathname}?${queryString}`, { scroll: false })
  }

  const optionChangeHandler = useCallback(
    (option) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()))
      current.set("eCommerceMode", option.value)
      current.set("page", "1") // Reset page to 1
      const search = current.toString()
      const query = search ? `?${search}` : ""
      router.push(`${pathname}${query}`, { scroll: false })
    },
    [pathname, router, searchParams],
  )

  return (
    <>
      <div>
        <div>
          <SearchInput
            locationPlaceholder={SearchPlaceHolder?.locationPlaceholder}
            namePlaceholder={SearchPlaceHolder?.namePlaceholder}
            zipCodePlaceholder={SearchPlaceHolder?.zipCodePlaceholder}
            cityPlaceHolder={SearchPlaceHolder?.cityPlaceHolder}
            customFields={customFields}
          />
        </div>
        <div onClick={() => dispatch(toggleFilerSidebar(false))} className="close_filter">
          <FaRegCircleXmark />
        </div>
        {operatingMode ? (
          <div className="">
            <hr className={style.fillter_line}></hr>
            <div className={style.wrap_fltr_group}>
              <h3> {modeTitle} </h3>
              {serviceMode.map(({ label, value }, index) => (
                <FilterCheckBox
                  checked={selectedServiceModes.includes(value)}
                  onChange={(value) => onChangeServiceHandler(value)}
                  key={index}
                  name={label}
                  value={value}
                />
              ))}
            </div>
          </div>
        ) : null}
        {userRating ? (
          <div className="">
            <hr className={style.fillter_line}></hr>
            <div className={style.wrap_fltr_group}>
              <h3> Customer Ratings </h3>
              {ratingTypes.map(({ label, value }, index) => (
                <FilterCheckBox
                  checked={ratingFilter.includes(value)}
                  onChange={(value) => onChangeHandler(value)}
                  key={index}
                  name={label}
                  value={value}
                />
              ))}
            </div>
          </div>
        ) : null}
        {eCommerceMode ? (
          <div className="">
            <hr className={style.fillter_line}></hr>
            <div className={style.wrap_fltr_group}>
              <h3> E-commerce Enabled </h3>
              <div className={style.wrap_checkbox_fltr}>
                <div className="d-flex align-items-center">
                  <Select
                    value={filterOptions.find((option) => option.value === eComStatus)}
                    placeholder="select"
                    className="filter_options"
                    onChange={optionChangeHandler}
                    options={filterOptions}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default React.memo(FilterSidebar)
