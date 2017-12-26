package org.fast.service.domain;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

/**
 * Description:  Menu
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2017/12/25
 */
@Entity
@Table(name = "fast_menu")
public class FastMenu {
    private String uuid;
    private String puuid;
    private String text;
    private Integer seqNo;
    private String menuCode;
    private String menuType;
    private String menuAction;
    private Integer isActive;
    private String imgCls;
    private String iconSmallPath;
    private String iconMediumPath;
    private String iconLargePath;
    private String iconCls;
    private Date createTime;
    private String createBy;
    private Date updateTime;
    private String updateBy;

    @Column(name = "uuid", nullable = false, insertable = true, updatable = true, length = 32, precision = 0)
    @Id
    @GeneratedValue(generator = "idGenerator")
    @GenericGenerator(name = "idGenerator", strategy = "uuid")
    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    @Column(name = "puuid", nullable = true, insertable = true, updatable = true, length = 32, precision = 0)
    public String getPuuid() {
        return puuid;
    }

    public void setPuuid(String puuid) {
        this.puuid = puuid;
    }

    @Column(name = "text", nullable = true, insertable = true, updatable = true, length = 32, precision = 0)
    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Column(name = "seqNo", nullable = true, insertable = true, updatable = true, length = 32, precision = 0)
    public Integer getSeqNo() {
        return seqNo;
    }

    public void setSeqNo(Integer seqNo) {
        this.seqNo = seqNo;
    }

    @Column(name = "menuCode", nullable = true, insertable = true, updatable = true, length = 32, precision = 0)
    public String getMenuCode() {
        return menuCode;
    }

    public void setMenuCode(String menuCode) {
        this.menuCode = menuCode;
    }

    @Column(name = "menuType", nullable = true, insertable = true, updatable = true, length = 32, precision = 0)
    public String getMenuType() {
        return menuType;
    }

    public void setMenuType(String menuType) {
        this.menuType = menuType;
    }

    @Column(name = "menuAction", nullable = true, insertable = true, updatable = true, length = 32, precision = 0)
    public String getMenuAction() {
        return menuAction;
    }

    public void setMenuAction(String menuAction) {
        this.menuAction = menuAction;
    }

    @Column(name = "isActive", nullable = true, insertable = true, updatable = true, length = 32, precision = 0)
    public Integer getIsActive() {
        return isActive;
    }

    public void setIsActive(Integer isActive) {
        this.isActive = isActive;
    }

    @Column(name = "imgCls", nullable = true, insertable = true, updatable = true, length = 32, precision = 0)
    public String getImgCls() {
        return imgCls;
    }

    public void setImgCls(String imgCls) {
        this.imgCls = imgCls;
    }

    @Column(name = "iconSmallPath", nullable = true, insertable = true, updatable = true, length = 32, precision = 0)
    public String getIconSmallPath() {
        return iconSmallPath;
    }

    public void setIconSmallPath(String iconSmallPath) {
        this.iconSmallPath = iconSmallPath;
    }

    @Column(name = "iconMediumPath", nullable = true, insertable = true, updatable = true, length = 32, precision = 0)
    public String getIconMediumPath() {
        return iconMediumPath;
    }

    public void setIconMediumPath(String iconMediumPath) {
        this.iconMediumPath = iconMediumPath;
    }

    @Column(name = "iconLargePath", nullable = true, insertable = true, updatable = true, length = 32, precision = 0)
    public String getIconLargePath() {
        return iconLargePath;
    }

    public void setIconLargePath(String iconLargePath) {
        this.iconLargePath = iconLargePath;
    }

    @Column(name = "iconCls", nullable = true, insertable = true, updatable = true, length = 32, precision = 0)
    public String getIconCls() {
        return iconCls;
    }

    public void setIconCls(String iconCls) {
        this.iconCls = iconCls;
    }

    @Column(name = "createTime", nullable = true, insertable = true, updatable = true, length = 32, precision = 0)
    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Column(name = "createBy", nullable = true, insertable = true, updatable = true, length = 32, precision = 0)
    public String getCreateBy() {
        return createBy;
    }

    public void setCreateBy(String createBy) {
        this.createBy = createBy;
    }

    @Column(name = "updateTime", nullable = true, insertable = true, updatable = true, length = 32, precision = 0)
    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    @Column(name = "updateBy", nullable = true, insertable = true, updatable = true, length = 32, precision = 0)
    public String getUpdateBy() {
        return updateBy;
    }

    public void setUpdateBy(String updateBy) {
        this.updateBy = updateBy;
    }
}
