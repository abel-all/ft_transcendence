
const PrivacyContent = ({ contentData=[], page }) => {
    return (
        <div className="mt-[160px] flex flex-col items-center gap-[80px]">
            <div className="flex flex-col items-center gap-[20px]">
                <div className="title-container text-[#fff6f9] text-[40px] font-medium">
                {page.split(" ")[0]} <span className="text-[#00CEFF]">{page.split(" ").map((word, index) => index ? `${word} ` : "")}</span>
                </div>
                <div className="description-cntr text-[#fff6f9]/60 text-center text-[14px]">
                    <div>Thanks for using PING! Our {page} details how we handle your info.</div>
                    <div>By using PING! you agree to these practices</div>
                </div>
            </div>
            <div className="flex flex-col gap-[25px] mb-[200px]">
                {contentData.map(({title, description}, index) => (
                    <div key={index} className="content-cntr text-[#fff6f9] flex flex-col gap-[15px]">
                        <div className="title text-[25px]">{title}</div>
                        <div className="description text-[#fff6f9]/70 font-light" dangerouslySetInnerHTML={{ __html: description }}></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PrivacyContent
